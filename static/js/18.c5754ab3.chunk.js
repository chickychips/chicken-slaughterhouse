(this["webpackJsonpchicken-slaughterhouse"]=this["webpackJsonpchicken-slaughterhouse"]||[]).push([[18],{528:function(e,t,a){},544:function(e,t,a){"use strict";a.r(t);var n=a(321),i=a(322),r=a(323),l=a(324),o=a(0),s=a.n(o),u=a(45),c=a(14),m=a(133),d=a(376),h=a(189),g=a(546),p=a(547),y=a(377),f=a(545),k=a(97),E=(a(528),d.a.Option),I=function(e){Object(l.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,r=new Array(i),l=0;l<i;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={itemSelectOption:null,orderList:null,quantityWeightMeasurementUnit:null,quantityVolumeMeasurementUnit:null,customerSelectOption:null,totalDiscount:null,totalPrice:null,totalQuantityWeight:null,totalQuantityVolume:null,thawingOptionHideToggle:null},e.formRefInput=s.a.createRef(),e.onItemSourceChange=function(t){var a=e.props.transactionData;e.formRefInput.current.setFieldsValue({quantityWeight:void 0,quantityVolume:void 0,itemName:void 0,isThawed:!1});var n="",i=!0;"freshWarehouse"===t?n=a.stockFresh.map((function(e){return s.a.createElement(E,{value:e.item_name,key:e.item_name},"Fresh ",e.item_name)})):(i=!1,n=a.stockFresh.map((function(e){return s.a.createElement(E,{value:e.item_name,key:e.item_name},"Frozen ",e.item_name)}))),e.setState({thawingOptionHideToggle:i,itemSelectOption:n,quantityWeightMeasurementUnit:"kg",quantityVolumeMeasurementUnit:"Ekor"})},e.onItemChange=function(t){var a,n=e.props.transactionData,i="",r=[];r="freshWarehouse"===e.formRefInput.current.getFieldsValue().itemSource?n.stockFresh.filter((function(e){return e.item_name===t})):n.stockFrozen.filter((function(e){return e.item_name===t})),a="kg | Max : ".concat(r[0].quantity_weight),i="whole"===r[0].group?"".concat("main"===r[0].type?"Ekor":"Pax"," | Max : ").concat(r[0].quantity_volume):"Pax | Max : ".concat(r[0].quantity_volume),e.setState({quantityWeightMeasurementUnit:a,quantityVolumeMeasurementUnit:i})},e.onQuantityWeightChange=function(t){var a=e.formRefInput.current.getFieldsValue(),n=a.unitPrice,i=a.discount;void 0!==n&&""!==n||(n=0),void 0!==i&&""!==i||(i=0);var r=t.target.value*n-i;e.formRefInput.current.setFieldsValue({totalPrice:r})},e.onDiscountChange=function(t){var a=e.formRefInput.current.getFieldsValue(),n=a.unitPrice,i=a.quantityWeight;void 0!==n&&""!==n||(n=0),void 0!==i&&""!==i||(i=0);var r=n*i-t.target.value;e.formRefInput.current.setFieldsValue({totalPrice:r})},e.onUnitPriceChange=function(t){var a=e.formRefInput.current.getFieldsValue(),n=a.discount,i=a.quantityWeight;void 0!==i&&""!==i||(i=0),void 0!==n&&""!==n||(n=0);var r=t.target.value*i-n;e.formRefInput.current.setFieldsValue({totalPrice:r})},e.onFinish=function(t){var a=e.formRefInput.current.getFieldsValue().itemSource,n=e.state,i=n.orderList,r=n.totalDiscount,l=n.totalPrice,o=n.totalQuantityWeight,s=n.totalQuantityVolume;e.setState({orderList:[]});var u=1;null===i?i=[]:i.length>0&&(u=i[i.length-1].key+1);var c="freshWarehouse"===a?"FRESH":"FROZEN";i.push({key:u,itemType:c,name:t.itemName,isFrozen:"FROZEN"===c,isThawed:t.isThawed,isThawedDescription:!0===t.isThawed?"Iya":"Tidak",quantityWeight:t.quantityWeight,quantityVolume:t.quantityVolume,unitPrice:t.unitPrice,discount:t.discount,totalPrice:t.totalPrice}),console.log(i),r+=parseInt(t.discount,10),l+=parseInt(t.totalPrice,10),o+=parseInt(t.quantityWeight,10),s+=parseInt(t.quantityVolume,10),e.setState({orderList:i,totalDiscount:r,totalPrice:l,totalQuantityWeight:o,totalQuantityVolume:s}),e.formRefInput.current.setFieldsValue({itemName:void 0,quantityWeight:void 0,quantityVolume:void 0,unitPrice:void 0,discount:void 0,totalPrice:void 0})},e.onButtonAddClick=function(){var t=e.props.salesOrderId,a=e.formRefInput.current.getFieldsValue().customer,n=e.state,i=n.totalQuantityWeight,r=n.totalQuantityVolume,l=n.totalDiscount,o=n.totalPrice,s=n.orderList;if(null===s||s.length<1)h.a.error({message:"Mohon isi daftar order"});else{var u={id:t,customer:a,totalQuantityWeight:i,totalQuantityVolume:r,totalDiscount:l,totalPrice:o,items:s};(0,e.props.addTransaction)(u)}},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.generateSalesOrderId,a=e.getTransactionData;t(),a()}},{key:"render",value:function(){var e=[{title:"Tipe Item",width:100,dataIndex:"itemType",key:"itemType"},{title:"Nama Item",width:100,dataIndex:"name",key:"name"},{title:"Cairkan Item",width:100,dataIndex:"isThawedDescription",key:"isThawedDescription"},{title:"Qty (kg)",width:100,dataIndex:"quantityWeight",key:"quantityWeight"},{title:"Qty (Ekor/Pax)",width:100,dataIndex:"quantityVolume",key:"quantityVolume"},{title:"Harga /kg",width:100,dataIndex:"unitPrice",key:"unitPrice"},{title:"Discount",width:100,dataIndex:"discount",key:"discount"},{title:"Total",width:100,dataIndex:"totalPrice",key:"totalPrice"},{title:"Action",key:"operation",fixed:"right",width:60,render:function(){return s.a.createElement("a",null,"Delete")}}],t=this.props,a=t.salesOrderId,n=t.transactionData,i=(new Date).toLocaleDateString("en-US"),r=this.state,l=r.thawingOptionHideToggle,o=r.itemSelectOption,c=r.orderList,h=r.quantityWeightMeasurementUnit,I=r.quantityVolumeMeasurementUnit,v=r.customerSelectOption,b=r.totalDiscount,q=r.totalPrice,T=r.totalQuantityWeight,N=r.totalQuantityVolume;return l=null===l||l,v=v||[],o=o||[],c=c||[],h=h||"kg",I=I||"Ekor",b=b||0,q=q||0,T=T||0,N=N||0,Object.keys(n).length>0&&(v=n.customerList.map((function(e){return s.a.createElement(E,{value:e.name,key:e.name},e.name)}))),s.a.createElement("div",null,s.a.createElement(m.a,{title:"Input / Order"}),s.a.createElement("div",{className:"kit__utils__heading"},s.a.createElement("h5",null,"Input Order")),s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-body"},s.a.createElement(g.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:12}}},{ref:this.formRefInput,labelAlign:"left",onFinish:this.onFinish}),s.a.createElement(g.a.Item,{name:"salesOrderId",label:"Kode Cutting"},s.a.createElement(p.a,{placeholder:a,disabled:!0})),s.a.createElement(g.a.Item,{name:"dateToday",label:"Tanggal"},s.a.createElement(p.a,{placeholder:i,disabled:!0})),s.a.createElement(g.a.Item,{id:"customer",name:"customer",label:"Nama Customer",rules:[{required:!0,message:"Customer harus dipilih"}]},s.a.createElement(d.a,{placeholder:"Pilih customer"},v)),s.a.createElement(g.a.Item,{id:"itemSource",name:"itemSource",label:"Asal Item",rules:[{required:!0,message:"Asal Item harus dipilih"}]},s.a.createElement(d.a,{onChange:this.onItemSourceChange,placeholder:"Pilih asal item"},s.a.createElement(E,{value:"freshWarehouse",key:"freshWarehouse"},"Stok Fresh"),s.a.createElement(E,{value:"frozenWarehouse",key:"frozenWarehouse"},"Stok Frozen"))),s.a.createElement(g.a.Item,{id:"itemName",name:"itemName",label:"Nama Item",rules:[{required:!0,message:"Item harus dipilih"}]},s.a.createElement(d.a,{onChange:this.onItemChange,placeholder:"Pilih item"},o)),s.a.createElement(g.a.Item,{name:"quantityWeight",label:"Quantity",rules:[{required:!0,message:"Quantity harus diisi"}]},s.a.createElement(p.a,{type:"number",onChange:this.onQuantityWeightChange,placeholder:"Masukkan quantity",addonAfter:h})),s.a.createElement(g.a.Item,{name:"quantityVolume",label:"Quantity",rules:[{required:!0,message:"Quantity harus diisi"}]},s.a.createElement(p.a,{type:"number",placeholder:"Masukkan quantity",addonAfter:I})),s.a.createElement(g.a.Item,{name:"unitPrice",label:"Harga / kg",rules:[{required:!0,message:"Harga harus diisi"}]},s.a.createElement(p.a,{type:"number",onChange:this.onUnitPriceChange,placeholder:"Masukkan harga/kg",addonBefore:"Rp.",addonAfter:"/ kg"})),s.a.createElement(g.a.Item,{name:"discount",label:"Discount",rules:[{required:!0,message:"Discount harus diisi"}]},s.a.createElement(p.a,{type:"number",onChange:this.onDiscountChange,placeholder:"Masukkan discount",addonBefore:"Rp.",addonAfter:"/ kg"})),s.a.createElement(g.a.Item,{name:"totalPrice",label:"Total harga",rules:[{required:!0,message:"Total harga harus diisi"}]},s.a.createElement(p.a,{type:"number",disabled:!0,placeholder:"Masukkan total harga",addonBefore:"Rp."})),s.a.createElement(g.a.Item,{valuePropName:"checked",name:"isThawed",style:!0===l?{display:"none"}:{display:""}},s.a.createElement(y.a,{className:"text-uppercase"},"Centang jika item ingin dicairkan")),s.a.createElement("button",{type:"submit",className:"btn btn-success"},"Tambah Order"),s.a.createElement("div",null,s.a.createElement("br",null)),s.a.createElement("div",{className:"mb-4 kit__utils__scrollTable"},s.a.createElement(f.a,{columns:e,dataSource:c,scroll:{x:1500,y:300}}))),s.a.createElement("div",{className:"border-top text-dark font-size-18 pt-4"},s.a.createElement("p",{className:"mb-1 text-right"},"Total Qty (kg): ",s.a.createElement("strong",{className:"font-size-24"},"Rp. ",T)),s.a.createElement("p",{className:"mb-1 text-right"},"Total Qty (Ekor/Pax): ",s.a.createElement("strong",{className:"font-size-24"},"Rp. ",N)),s.a.createElement("p",{className:"mb-1 text-right"},"Total Discount: ",s.a.createElement("strong",{className:"font-size-24"},"Rp ",b)),s.a.createElement("p",{className:"mb-4 text-right"},"Grand Total: ",s.a.createElement("strong",{className:"font-size-36"},"Rp ",q)),s.a.createElement(u.a,{to:"/transaction",className:"kit__utils__link font-size-16"},s.a.createElement("i",{className:"fe fe-arrow-left mr-1 align-middle"}),"Kembali"),s.a.createElement(k.a,{onClick:this.onButtonAddClick,className:"btn btn-lg btn-success width-200 mb-2 float-right"},"Submit Order")))))}}]),a}(s.a.Component);t.default=Object(c.c)((function(e){var t=e.transaction;return{salesOrderId:t.salesOrderId,transactionData:t.transactionData}}),(function(e){return{generateSalesOrderId:function(){e({type:"transaction/GENERATE_ORDER_ID"})},getTransactionData:function(){e({type:"transaction/GET_TRANSACTION_DATA"})},addTransaction:function(t){e({type:"transaction/ADD_TRANSACTION",payload:t})}}}))(I)}}]);
//# sourceMappingURL=18.c5754ab3.chunk.js.map