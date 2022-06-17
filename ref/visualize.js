
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};

var filtered = ee.FeatureCollection('users/jwst28/desa32_2020')
var simplifiedCol = filtered.map(function(filtered) {
  return filtered.simplify({maxError: 100});
});


var arr = filtered.reduceColumns(ee.Reducer.toList(), ['iddesa']).get("list")
var elis = ee.List(arr)

var nond = ["3201240017"]


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
                  .select( ['B4', 'B3', 'B2'])
              
//var img_number = image.size()
//print(img_number)

var sorted = image.sort('CLOUDY_PIXEL_PERCENTAGE');

// Get the first (least cloudy) image.

var composite = image.median()
var i=2365

var myfilter = ee.Filter.eq('iddesa',  elis.getString(i))
var data = simplifiedCol.filter(myfilter)
var rect = data.geometry().bounds()

var lim = composite.clip(rect)
Map.addLayer(data, visualization, 'shp')
Map.addLayer(data.geometry().bounds(), visualization, 'shp2')
//Map.addLayer(lim, visualization,"my layer");


var polygonBuffer1 = data.geometry().centroid().buffer(ee.Number(rect.area(1)).sqrt().divide(2), 1).bounds()
Map.addLayer(polygonBuffer1,
             {'color': 'black'},
             'Geometry [black]: polygon1');
             
/*
var polygonBuffer2 = data.geometry().centroid().buffer(l2.pow(ee.Number(2)).divide(2), 1).bounds()
var p =rect.perimeter({'maxError': 1})
var a = rect.area({'maxError': 1})
var per = p.pow(2).subtract(a.multiply(8)).sqrt()
var l1 = p.add(per).divide(2)
var l2 = p.subtract(per).divide(2)
print(l1)
print(l2)
print(a)
Map.addLayer(polygonBuffer2,
             {'color': 'black'},
             'Geometry [black]: polygon2');
*/