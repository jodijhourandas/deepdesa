library(raster)
DSM_HARV <-   stack("C:/Users/jwst2/Downloads/imageToCOGeoTiffExample.tif")
plot(DSM_HARV)

summary(DSM_HARV)
DSM_HARV$B4$
dat = import("dataset/ppp_IDN_2020_1km_Aggregated_UNadj.csv")

library("tiff")
library("jpeg")

img = readTIFF("dataset/sentinel_3band_ID3171010003.tif",convert = )
writeJPEG(as.array(DSM_HARV)/255,"try.jpeg",quality = 1)
plotRGB(DSM_HARV,  r = 0, g = 1, b = 2)


library("RGISTools")
wdir <- tempdir()
data("ex.navarre")
sres <- modSearch(product = "MOD09GA",
                     dates = as.Date("2018-08-02") + seq(0 , 7, 1),
                     region = ex.navarre)
modPreview(searchres = sres, dates = as.Date("2018-08-02"))


setwd("/Your/Working/Directory/raster/")

library(raster)
library(rgdal)

# load raster
r = stack("D:/kuliah/Tesis/GGE tesis/images/Tesis-Desa-sq-jabar/3205080004.tif")
# downsample
r = aggregate(r, fact = 3) 

plotRGB(r)
# read shapefile
shp = readOGR("D:/kuliah/Tesis/GGE tesis/Polygon/final_sls_32/final_sls_3205_2019_1.shp")
shpDesa = subset(shp,substr(idsls,1,10) == "3205080004")
shpDesa
plot(r)
plot(shpDesa[3,], add = T)
r2 = crop(r, shpDesa[3,])

plot(shpDesa[3,], add = T)
writeRaster(r2,"my.tiff",)
