
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};

var filtered = ee.FeatureCollection('users/jwst28/desa32_2020')
var simplifiedCol = filtered.map(function(filtered) {
  return filtered.simplify({maxError: 0});
});


var arr = filtered.reduceColumns(ee.Reducer.toList(), ['iddesa']).get("list")
var elis = ee.List(arr)

var nond =[ "3203070017" ,"3203070018", "3203070019", "3203070020", "3203070021", "3203070022" ,"3217150005", "3217150006", "3217150007","3217150008" ,"3217150009" ,"3217150010" ,"3217150011", "3217150012", "3271010001", "3271010002" ,"3271010003" ,"3271010004"]

print(nond[0])
print(elis.size())
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}



var image = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-12-31')
                  .filterBounds(simplifiedCol)
                  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than",30)
                  .map(maskS2clouds)
                  .select( ['B4', 'B3', 'B2','B8'])
              
//var img_number = image.size()
//print(img_number)

var sorted = image.sort('CLOUDY_PIXEL_PERCENTAGE');

// Get the first (least cloudy) image.

var composite = image.median()
var from  = 1500 
var to = 2000

print(elis.getString(from))
print(elis.getString(to))

for(var i=from ; i <to;i++){
  var myfilter = ee.Filter.eq('iddesa', elis.getString(i))
  var data = simplifiedCol.filter(myfilter)
  var rect = data.geometry().bounds()
  var pol = data.geometry().centroid().buffer(ee.Number(rect.area(1)).sqrt(), 1).bounds()
/*
Map.addLayer(composite.clip(data.geometry().bounds()), visualization,"my layer");
Map.addLayer(data, visualization, 'shp')
Map.addLayer(data.geometry().bounds(), visualization, 'shp2')
*/


var lastimage = composite.clip(pol)
Export.image.toDrive({
  image: lastimage,
  description: elis.getString(i).getInfo(),
  scale: 10,
  folder: 'peta',
  region: pol,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
}

