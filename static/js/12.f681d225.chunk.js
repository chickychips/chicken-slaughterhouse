(this["webpackJsonpchicken-slaughterhouse"]=this["webpackJsonpchicken-slaughterhouse"]||[]).push([[12],{522:function(e,a,t){},532:function(e,a,t){"use strict";t.r(a);var i=t(0),l=t.n(i),u=t(45),r=t(13),s=t(133),n=t(376),p=t(538),m=t(537),o=(t(522),n.a.Option),c=p.a.TextArea;a.default=Object(r.c)((function(e){var a=e.masterData;return{outputTypeHideToggle:a.outputTypeHideToggle,outputTypeRequired:a.outputTypeRequired}}))((function(e){var a=e.dispatch,t=e.outputTypeHideToggle,i=e.outputTypeRequired;return l.a.createElement("div",null,l.a.createElement(s.a,{title:"Tambah / Produk"}),l.a.createElement("div",{className:"kit__utils__heading"},l.a.createElement("h5",null,"Tambah Produk")),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement(m.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:12}}},{labelAlign:"left",onFinish:function(e){"alive"===e.itemType&&(e.itemOutputType="main"),a({type:"masterData/ADD_ITEM",payload:e})}}),l.a.createElement(m.a.Item,{id:"itemType",name:"itemType",label:"Tipe Produk",rules:[{required:!0,message:"Tipe Produk harus dipilih"}]},l.a.createElement(n.a,{onChange:function(e){a("alive"!==e?{type:"masterData/SET_STATE",payload:{outputTypeHideToggle:!1,outputTypeRequired:!0}}:{type:"masterData/SET_STATE",payload:{outputTypeHideToggle:!0,outputTypeRequired:!1}})},placeholder:"Pilih Tipe Produk"},l.a.createElement(o,{value:"alive",key:"typeAlive"},"Bahan Dasar"),l.a.createElement(o,{value:"whole",key:"typeWhole"},"Hasil Cutting"),l.a.createElement(o,{value:"pieces",key:"typePieces"},"Hasil Cutting Olahan"))),l.a.createElement(m.a.Item,{id:"itemOutputType",name:"itemOutputType",label:"Tipe Hasil Cutting",rules:[{required:i,message:"Tipe Hasil Cutting harus dipilih"}],style:!0===t?{display:"none"}:{display:""}},l.a.createElement(n.a,{placeholder:"Pilih Tipe Produk"},l.a.createElement(o,{value:"main",key:"outputTypeMain"},"Utama"),l.a.createElement(o,{value:"side",key:"outputTypeSide"},"Sampingan"))),l.a.createElement(m.a.Item,{id:"name",name:"name",label:"Nama Produk",rules:[{required:!0,message:"Nama Produk harus diisi"}]},l.a.createElement(p.a,{placeholder:"Tulis Nama Produk"})),l.a.createElement(m.a.Item,{name:"description",label:"Deskripsi",rules:[{required:!0,message:"Deskripsi harus diisi"}]},l.a.createElement(c,{rows:4,placeholder:"Tulis Deskripsi"})),l.a.createElement(u.a,{to:"/master-data/item",className:"kit__utils__link font-size-16"},l.a.createElement("i",{className:"fe fe-arrow-left mr-1 align-middle"}),"Kembali"),l.a.createElement("button",{type:"submit",className:"btn btn-success float-right"},"Tambah Pemasok")))))}))}}]);
//# sourceMappingURL=12.f681d225.chunk.js.map