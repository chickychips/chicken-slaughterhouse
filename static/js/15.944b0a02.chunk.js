(this["webpackJsonpchicken-slaughterhouse"]=this["webpackJsonpchicken-slaughterhouse"]||[]).push([[15],{525:function(t,e,a){},535:function(t,e,a){"use strict";a.r(e);var n=a(322),i=a(323),u=a(324),l=a(325),o=a(0),r=a.n(o),m=a(45),s=a(13),c=a(133),p=a(376),d=a(189),g=a(537),h=a(538),y=a(536),I=a(97),f=(a(525),p.a.Option),v=function(t){Object(l.a)(a,t);var e=Object(u.a)(a);function a(){var t;Object(n.a)(this,a);for(var i=arguments.length,u=new Array(i),l=0;l<i;l++)u[l]=arguments[l];return(t=e.call.apply(e,[this].concat(u))).state={productionIdSelectOption:null,formProductionIdHideToggle:!0,outputItemSelectOption:null,inputItemSelectOption:null,outputItemList:null,inputQuantityWeightValue:null,inputQuantityVolumeValue:null},t.formRefInput=r.a.createRef(),t.formRefOutput=r.a.createRef(),t.onItemSourceChange=function(e){var a=t.props.cuttingData;if(t.formRefOutput.current.setFieldsValue({outputItemName:void 0,quantityWeight:void 0,quantityVolume:void 0}),t.formRefInput.current.setFieldsValue({productionId:void 0,inputQuantityWeight:void 0,inputQuantityVolume:void 0,itemName:void 0}),"production"===e){var n=a.supplyList.map((function(t){return r.a.createElement(f,{value:t.production_id,key:t.production_id},t.production_id)}));t.setState({formProductionIdHideToggle:!1,productionIdSelectOption:n,inputItemSelectOption:[],outputItemList:[],outputItemSelectOption:[]})}else{t.setState({formProductionIdHideToggle:!0,outputItemList:[],outputItemSelectOption:[]});var i=a.stockList.filter((function(t){return"whole"===t.group})).map((function(t){return r.a.createElement(f,{value:t.item_name,key:t.item_name},t.item_name)}));t.setState({inputItemSelectOption:i})}},t.onProductionIdChange=function(e){var a=t.props.cuttingData;t.setState({inputItemSelectOption:[],outputItemList:[],outputItemSelectOption:[]}),t.formRefInput.current.setFieldsValue({inputQuantityWeight:void 0,inputQuantityVolume:void 0,itemName:void 0});var n=a.supplyList.filter((function(t){return t.production_id===e})),i=n.map((function(t){return r.a.createElement(f,{value:t.item_name,key:t.item_name},t.item_name)}));t.formRefOutput.current.setFieldsValue({outputItemName:void 0,quantityWeight:void 0,quantityVolume:void 0}),t.setState({inputItemSelectOption:i,inputQuantityWeightValue:n[0].quantity_weight,inputQuantityVolumeValue:n[0].quantity_volume})},t.onInputItemChange=function(e){var a=t.props.cuttingData,n=a.stockList.filter((function(t){return t.item_name===e}));console.log("inputitem list",n);var i="whole";if("whole"===n[0].group)i="pieces",t.setState({inputQuantityWeightValue:n[0].quantity_weight,inputQuantityVolumeValue:n[0].quantity_volume}),t.formRefInput.current.setFieldsValue({inputQuantityWeight:n[0].quantity_weight,inputQuantityVolume:n[0].quantity_volume});else{var u=t.state,l=u.inputQuantityWeightValue,o=u.inputQuantityVolumeValue;t.formRefInput.current.setFieldsValue({inputQuantityWeight:l,inputQuantityVolume:o})}var m=a.itemList.filter((function(t){return t.group===i})).map((function(t){return r.a.createElement(f,{value:t.name,key:t.name},t.name)}));t.setState({outputItemSelectOption:m,outputItemList:[]}),t.formRefOutput.current.setFieldsValue({outputItemName:void 0,quantityWeight:void 0,quantityVolume:void 0})},t.onOutputItemChange=function(){t.formRefOutput.current.setFieldsValue({quantityWeight:void 0,quantityVolume:void 0})},t.onButtonAddClick=function(){var e=t.props.newCuttingId,a=t.state.outputItemList;if(null===a||a.length<1)d.a.error({message:"Please fill required data"});else{var n=t.formRefInput.current.getFieldsValue(),i=n.itemName,u=n.inputQuantityWeight,l=n.inputQuantityVolume,o=t.formRefInput.current.getFieldsValue().productionId,r={cuttingId:e,itemInput:i,inputQuantityWeight:u,inputQuantityVolume:l,itemOutput:a,referenceId:o=void 0===o?"":o};(0,t.props.processCutting)(r)}},t.onFinish=function(e){var a=t.state.outputItemList;t.setState({outputItemList:[]});var n=1;null===a?a=[]:a.length>0&&(n=a[a.length-1].key+1),a.push({key:n,name:e.outputItemName,quantityWeight:e.quantityWeight,quantityVolume:e.quantityVolume}),t.setState({outputItemList:a}),t.formRefOutput.current.setFieldsValue({outputItemName:void 0,quantityWeight:void 0,quantityVolume:void 0})},t}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var t=this.props,e=t.generateCuttingId,a=t.getCuttingData;e(),a()}},{key:"render",value:function(){var t=[{title:"Nama Item",width:100,dataIndex:"name",key:"name"},{title:"Quantity (kg)",width:100,dataIndex:"quantityWeight",key:"quantityWeight"},{title:"Quantity (Ekor)",width:100,dataIndex:"quantityVolume",key:"quantityVolume"},{title:"Action",key:"operation",fixed:"right",width:60,render:function(){return r.a.createElement("a",null,"Delete")}}],e={labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:12}}},a=this.props,n=a.newCuttingId,i=a.cuttingData,u=(new Date).toLocaleDateString("en-US");if(Object.keys(i).length>0){var l=i.itemList.filter((function(t){return"whole"===t.group}));console.log("itemList",l)}var o=this.state,s=o.inputItemSelectOption,d=o.outputItemSelectOption,v=o.productionIdSelectOption,E=o.formProductionIdHideToggle,k=o.outputItemList,V=o.inputQuantityWeightValue,_=o.inputQuantityVolumeValue;return s=s||[],d=d||[],v=v||[],E=null===E||E,k=k||[],V=V||"",_=_||"",console.log(v),r.a.createElement("div",null,r.a.createElement(c.a,{title:"Input / Pengajuan"}),r.a.createElement("div",{className:"kit__utils__heading"},r.a.createElement("h5",null,"Input pengajuan")),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement(g.a,Object.assign({},e,{ref:this.formRefInput,labelAlign:"left"}),r.a.createElement(g.a.Item,{name:"cuttingId",label:"Kode Cutting"},r.a.createElement(h.a,{placeholder:n,disabled:!0})),r.a.createElement(g.a.Item,{name:"dateToday",label:"Tanggal"},r.a.createElement(h.a,{placeholder:u,disabled:!0})),r.a.createElement("div",{className:"kit__utils__heading"},r.a.createElement("h5",null,"Asal Item Produksi")),r.a.createElement(g.a.Item,{id:"itemSource",name:"itemSource",label:"Asal Item",rules:[{required:!0,message:"Asal Item harus dipilih"}]},r.a.createElement(p.a,{onChange:this.onItemSourceChange,placeholder:"Pilih asal item"},r.a.createElement(f,{value:"production",key:"production"},"Pengajuan"),r.a.createElement(f,{value:"freshWarehouse",key:"freshWarehouse"},"Stok fresh"))),r.a.createElement(g.a.Item,{id:"productionId",name:"productionId",label:"Kode produksi",rules:[{required:!0,message:"Item harus dipilih"}],style:!0===E?{display:"none"}:{display:""}},r.a.createElement(p.a,{onChange:this.onProductionIdChange,placeholder:"Pilih Kode Produksi"},v)),r.a.createElement(g.a.Item,{id:"itemName",name:"itemName",label:"Nama Item",rules:[{required:!0,message:"Item harus dipilih"}]},r.a.createElement(p.a,{onChange:this.onInputItemChange,placeholder:"Pilih item"},s)),r.a.createElement(g.a.Item,{name:"inputQuantityWeight",label:"Quantity",rules:[{required:!0,message:"Quantity harus diisi"}]},r.a.createElement(h.a,{type:"number",value:V,placeholder:"Masukkan quantity",addonAfter:"kg"})),r.a.createElement(g.a.Item,{name:"inputQuantityVolume",label:"Quantity",rules:[{required:!0,message:"Quantity harus diisi"}]},r.a.createElement(h.a,{type:"number",value:_,placeholder:"Masukkan quantity",addonAfter:"Ekor"}))),r.a.createElement(g.a,Object.assign({},e,{ref:this.formRefOutput,labelAlign:"left",onFinish:this.onFinish}),r.a.createElement("div",{className:"kit__utils__heading"},r.a.createElement("h5",null,"Hasil Produksi")),r.a.createElement(g.a.Item,{id:"outputItemName",name:"outputItemName",label:"Nama Item",rules:[{required:!0,message:"Item harus dipilih"}]},r.a.createElement(p.a,{onChange:this.onOutputItemChange,placeholder:"Pilih item"},d)),r.a.createElement(g.a.Item,{name:"quantityWeight",label:"Quantity",rules:[{required:!0,message:"Quantity harus diisi"}]},r.a.createElement(h.a,{type:"number",placeholder:"Masukkan quantity",addonAfter:"kg"})),r.a.createElement(g.a.Item,{name:"quantityVolume",label:"Quantity",rules:[{required:!0,message:"Quantity harus diisi"}]},r.a.createElement(h.a,{type:"number",placeholder:"Masukkan quantity",addonAfter:"Ekor"})),r.a.createElement("button",{type:"submit",className:"btn btn-success"},"Tambah Hasil Produksi"),r.a.createElement("div",null,r.a.createElement("br",null)),r.a.createElement("div",{className:"mb-4 kit__utils__scrollTable"},r.a.createElement(y.a,{columns:t,dataSource:k,scroll:{x:1500,y:300}}))),r.a.createElement(m.a,{to:"/",className:"kit__utils__link font-size-16"},r.a.createElement("i",{className:"fe fe-arrow-left mr-1 align-middle"}),"Kembali"),r.a.createElement(I.a,{onClick:this.onButtonAddClick,className:"float-right",style:{backgroundColor:"#55c392"}},"Proses"))))}}]),a}(r.a.Component);e.default=Object(s.c)((function(t){var e=t.cutting;return{newCuttingId:e.newCuttingId,cuttingData:e.cuttingData}}),(function(t){return{generateCuttingId:function(){t({type:"cutting/GENERATE_CUTTING_ID"})},getCuttingData:function(){t({type:"cutting/GET_DATA"})},processCutting:function(e){t({type:"cutting/PROCESS_CUTTING",payload:e})}}}))(v)}}]);
//# sourceMappingURL=15.944b0a02.chunk.js.map