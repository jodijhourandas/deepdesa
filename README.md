**Metadata Coding**

Meta data berikut bermanfaat untuk mempermudah menelusuri proses coding penelitian “KAJIAN METODE IDENTIFIKASI KARAKTERISTIK DESA DENGAN DEEP LEARNING CITRA SATELIT DI PROVINSI JAWA BARAT”

**Koding terdiri dari 5 bagian :**

•	Preprocessing (terletak paling luar) : Terdiri dari 5 files Python dan 1 file javascript GGE
•	Pemodelan Urban rural (Folder urban rural) : Terdiri 11 files Python
•	Pemodelan IDM ( Folder idm) : terdiri 13 files Pyton
•	Pemodelan Jumlah Keluarga (folder jumlahkeluarga) : 5 files pyhton
•	Ref (folder ref) : Merupakan coding yang tidak termasuk dalam penelitian tetapi menjadi analisis sampingan yang dilakukan untuk menelusuri hal hal menarik dari data dan pemodelan. Teridir dari coding 9 python, 2 R, dan 1 Java script. Pencantuman hanya untuk tambahan.

**Preprocessing :**
1.	`00. Sentinel Image Downloder.ipynb `: Kode download peta raster Sentinel-2 jawabarat dengan sentinelhub.
2.	`01. Raster Fill Trial.ipynb` : Kode program untuk ujicoba mengisi tutupan awan citra SPOT dengan ekstrapolasi masking. Karena tutupan awan terlalu tinggi, proses tidak berhasil. Sehingga citra dikeluarkan dari proses uji efek resolusi terhadap model.
3.	`02. Raster Clip Canvas.ipynb `: Kode untuk memotong raster di tingkat desa dan SLS sesuai data model. Hasil data tidak diupload karena lebih dari 500 GB
4.	`03. IDM Pdf Converter.ipynb `: Kode untuk konversi publikasi IMD pdf ke csv.
5.	`04. Data Split TrainTest.ipynb` : Kode untuk split data test 10%. Data split khusus untuk tingkat sls karena tidak bisa diotomatisasi oleh fastai untuk split yang sls dengan tetap mempertibangkan desa.

**Urban rural:**

Secara umum kode 1 untuk eksplorasi data. 2-4 kode untuk run data di tingkat desa dengan perbedaan neighboring effect. 5-7 kode untuk run data di tingkat SLS dengan perbedaan neighboring effect. 8-20 Untuk membandingkan model terbaik dan pengaruhnya terhadap reolusi citra. 11 kode Yang terakhir berkaitan dengan interpretasi model.  Kode yang kelompok relatif sama, dipisahkan dengan tujuan menyimpan seluruh hasil, lebih rinci :
1.	`00. Eksplrasi data.ipynb` : Kode untuk eksplorasi data urban rural
2.	`01. UR Desa Sentinel 10m TC.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor True crop, input tingkat desa.
3.	`02. UR Desa Sentinel 10m EN.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Envelope, input tingkat desa.
4.	`03. UR Desa Sentinel 10m ES.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Square, input tingkat desa.
5.	`04. UR SLS Sentinel 10m TC.ipynb `: Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor True crop, input tingkat sls. Perbedaan dengan koding sebelumnya ditambah dengan manual voting ensemble.
6.	`05. UR SLS Sentinel 10m EN.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Envelope, input tingkat sls. Perbedaan dengan koding sebelumnya ditambah dengan manual voting ensemble.
7.	`06. UR SLS Sentinel 10m ES.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Square, input tingkat sls. Perbedaan dengan koding sebelumnya ditambah dengan manual voting ensemble.
8.	`07. UR Desa Comparison SentinelXSpot.ipynb` : Kode uji perbandingan efek resolusi input desa dengan model terbaik untuk sentinel dan spot.
9.	`08. UR SLS Comparison Spot ES.ipynb` : Kode uji perbandingan efek resolusi input SLS dengan model terbaik untuk spot.
10.	`09. UR SLS Comparison Senitel 10m ES.ipynb` : Kode uji perbandingan efek resolusi input SLS dengan model terbaik untuk Sentinel.
11.	`10. Interpretaion.ipynb` : Kode program interpretasi dengan interpretable machine learning dengan anchor,ndvi, dll.

**IDM:**

Kode idm memiliki pola yang sama dengan urban rural dengan tambahan imbalance trearment.
1.	`00. Data exploration.ipynb` : Kode untuk eksplorasi data IDM
2.	`00. Imbalance IDM Treatment. Ipynb` : Kode untuk melakukan treatment imbalance pada data IDM
3.	`01. Desa Sentinel 10m TC.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor True crop, input tingkat desa.
4.	`02. Desa Sentinel 10m ES.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Envelope, input tingkat desa.
5.	`03.  Desa Sentinel 10m EN.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Square, input tingkat desa.
6.	`04. SLS Sentinel 10m TC.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor True crop, input tingkat sls. Perbedaan dengan koding sebelumnya ditambah dengan manual voting ensemble.
7.	`05. SLS Sentinel 10m ES.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Envelope, input tingkat sls. Perbedaan dengan koding sebelumnya ditambah dengan manual voting ensemble.
8.	`06. SLS Sentinel 10m EN.ipynb` : Kode modelling densenet dan resnet urban rural pada data sentinel 2 10m dengan neighbor Square, input tingkat sls. Perbedaan dengan koding sebelumnya ditambah dengan manual voting ensemble.
9.	`07. Desa Sentinel 10m ES Compare.ipynb` : Kode uji perbandingan efek resolusi input desa dengan model terbaik untuk sentinel.
10.	`08. Desa Sentinel 10m ES Compare.ipynb` : Kode uji perbandingan efek resolusi input desa dengan model terbaik untuk SPOT.
11.	`09. Desa Sentinel 10m ES Compare.ipynb` : Kode uji perbandingan efek resolusi input SLS dengan model terbaik untuk Sentinel.
12.	`10. Desa Spot 10m ES Compare.ipynb` : Kode uji perbandingan efek resolusi input SLS dengan model terbaik untuk SPOT.
13.	`11. Interpretaion.ipynb` : Kode program interpretasi dengan interpretable machine learning dengan anchor,ndvi, dll.


**jumlahkeluarga:**

Kode untuk melakukan estimasi jumlah keluarga dengan deeplearning dan xgboost.
1.	`01. run_pop_sentinel_desa.ipynb `: Kode program berikut untuk melakukan estimasi jumlah keluarga dengan deeplearnign dan xgboost. Input tingkat desa.
2.	`02. run_pop_sentinel_sls.ipynb` : Kode program berikut untuk melakukan estimasi jumlah keluarga dengan deeplearnign dan xgboost. Input tingkat sls.
3.	`03. run_pop_sentinel_desa_comparison.ipynb` : Kode program berikut untuk melakukan estimasi jumlah keluarga dengan deeplearnign dan xgboost. Input tingkat desa. Khusus data uji resolusi terhadap model
4.	`04. run_pop_sentinel_sls_comparison.ipynb` : Kode program berikut untuk melakukan estimasi jumlah keluarga dengan deeplearnign dan xgboost. Input tingkat SLS. Khusus data uji resolusi terhadap model
5.	`05. Model Interpretation.ipynb` : Interpretasi model xgboost dengan SHAP.


