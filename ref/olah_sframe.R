sp2020 = import("dataset/master_frame_sosial_2018.dbf")


rekapRuta = sp2020 %>%  group_by(PROP,KAB,KEC,DESA) %>% summarise(total_ruta = sum(JML_RUTA))
st_cf = strata.cumrootf(rekapRuta$total_ruta,Ls = 15,n =100)
st_geo = strata.geo(rekapRuta$total_ruta,Ls = 15,n =100)

rekapRutaS = rekapRuta %>% ungroup() %>% mutate(id = paste0("ID",PROP,KAB,KEC,DESA),cf = as.numeric(st_cf$stratumID) ,geo = as.numeric(st_geo$stratumID))
ggplot(rekapRutaS) +
  geom_bar(aes(x = geo),fill = "#56B4E9") +  ylab("Jumlah Desa") +
  xlab("Strata") + 
  theme(plot.title = element_text(hjust = 0.5))



write.csv(rekapRutaS %>%  filter(substr(id,1,6) == "ID3171"),"stratifikasi_ruta_sp2020_31.csv",row.names = F)

data = read.dbf("D:\\kuliah\\Tesis\\Python tesis\\maps\\banyuwangi\\sls_3510.dbf")



dataset  = import("D:/kuliah/Tesis/GGE tesis/Polygon/DESA_32/desa_32.dbf")
dataset2  = import("D:/kuliah/Tesis/GGE tesis/3200_sls.csv") %>%  filter(iddesa == "3202060005")
downloaded  = list.files("D:/kuliah/Tesis/GGE tesis/images/Tesis-Desa-sq-jabar/")
nond = dataset %>% filter(!iddesa %in% substr(downloaded,1,10))
