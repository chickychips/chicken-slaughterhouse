(this["webpackJsonpchicken-slaughterhouse"]=this["webpackJsonpchicken-slaughterhouse"]||[]).push([[11],{523:function(e,a,t){},533:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),i=t(45),r=t(13),l=t(133),m=t(376),u=t(538),c=t(537),d=(t(523),m.a.Option),p=u.a.TextArea;a.default=Object(r.c)((function(e){return{dispatch:e.dispatch,measurementUnits:e.masterData.measurementUnits}}))((function(e){var a=e.dispatch,t=e.measurementUnits,r=s.a.createElement(d,{key:"measurementUnits",disabled:!0},"satuan ukur");t.length>0&&(r=t.map((function(e){return s.a.createElement(d,{value:e.name,key:e.name},e.name)}))),Object(n.useEffect)((function(){o()}),[]);var o=function(){a({type:"masterData/GET_MEASUREMENT_UNITS"})};return s.a.createElement("div",null,s.a.createElement(l.a,{title:"Input / Pengajuan"}),s.a.createElement("div",{className:"kit__utils__heading"},s.a.createElement("h5",null,"Tambah Biaya")),s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-body"},s.a.createElement(c.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:12}}},{labelAlign:"left",onFinish:function(e){var n=t.filter((function(a){return a.name===e.measurementUnit}));e.measurementUnit=n[0].id,a({type:"masterData/ADD_EXPENSE",payload:e})}}),s.a.createElement(c.a.Item,{id:"name",name:"name",label:"Nama Biaya",rules:[{required:!0,message:"Nama harus diisi"}]},s.a.createElement(u.a,{placeholder:"Tulis Nama Biaya"})),s.a.createElement(c.a.Item,{id:"measurementUnit",name:"measurementUnit",label:"Satuan Ukur",rules:[{required:!0,message:"Satuan Ukur harus dipilih"}]},s.a.createElement(m.a,{placeholder:"Pilih Satuan Ukur"},r)),s.a.createElement(c.a.Item,{name:"description",label:"Deskripsi",rules:[{required:!0,message:"Deskripsi harus diisi"}]},s.a.createElement(p,{rows:4,placeholder:"Tulis Deskripsi"})),s.a.createElement(i.a,{to:"/master-data/expense",className:"kit__utils__link font-size-16"},s.a.createElement("i",{className:"fe fe-arrow-left mr-1 align-middle"}),"Kembali"),s.a.createElement("button",{type:"submit",className:"btn btn-success float-right"},"Tambah Biaya")))))}))}}]);
//# sourceMappingURL=11.7d9a7474.chunk.js.map