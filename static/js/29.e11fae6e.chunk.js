(this["webpackJsonpchicken-slaughterhouse"]=this["webpackJsonpchicken-slaughterhouse"]||[]).push([[29],{547:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(45),c=n(133),l=n(97),i=n(32),u=n(322),s=n(323),m=n(324),d=n(325),h=n(13),p=n(553),y=n(326),g=n.n(y),f=n(538),_=n(536),S=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).state={searchText:"",sortedInfo:null},e.handleChange=function(t,n,a){console.log(a),e.setState({sortedInfo:a})},e.getColumnSearchProps=function(t){return{filterDropdown:function(t){var n=t.setSelectedKeys,a=t.selectedKeys,o=t.confirm,c=t.clearFilters;return r.a.createElement("div",{style:{padding:8}},r.a.createElement(f.a,{ref:function(t){e.searchInput=t},placeholder:"Cari",value:a[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return e.handleSearch(a,o)},style:{width:188,marginBottom:8,display:"block"}}),r.a.createElement(l.a,{type:"primary",onClick:function(){return e.handleSearch(a,o)},icon:r.a.createElement(p.a,null),size:"small",style:{width:90,marginRight:8}},"Search"),r.a.createElement(l.a,{onClick:function(){return e.handleReset(c)},size:"small",style:{width:90}},"Reset"))},filterIcon:function(e){return r.a.createElement(p.a,{style:{color:e?"#1890ff":void 0}})},onFilter:function(e,n){n[t]=null===n[t]?"":n[t],n[t].toString().toLowerCase().includes(e.toLowerCase())},onFilterDropdownVisibleChange:function(t){t&&setTimeout((function(){return e.searchInput.select()}))},render:function(t){var n=e.state.searchText;return t=null===t?"":t,r.a.createElement(g.a,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[n],autoEscape:!0,textToHighlight:t.toString()})}}},e.handleSearch=function(t,n){n(),e.setState({searchText:t[0]})},e.handleReset=function(t){t(),e.setState({searchText:""})},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.getFrozenItemStock;(0,e.resetFrozenItemStock)(),t()}},{key:"render",value:function(){var e=this.state.sortedInfo;e=e||{};var t=[Object(i.a)({title:"Nama",width:150,dataIndex:"item_name",key:"item_name"},this.getColumnSearchProps("item_name"),{sorter:function(e,t){return e.item_name.length-t.item_name.length},sortOrder:"item_name"===e.columnKey&&e.order}),Object(i.a)({title:"Tipe Produk",dataIndex:"productType",key:"productType",width:150},this.getColumnSearchProps("productType"),{sorter:function(e,t){return e.productType.length-t.productType.length},sortOrder:"productType"===e.columnKey&&e.order}),Object(i.a)({title:"Quantity (kg)",dataIndex:"quantity_weight",key:"quantity_weight",width:150},this.getColumnSearchProps("quantity_weight"),{sorter:function(e,t){return e.quantity_weight-t.quantity_weight},sortOrder:"quantity_weight"===e.columnKey&&e.order}),Object(i.a)({title:"Quantity (ekor/pax)",dataIndex:"quantity_volume",key:"quantity_volume",width:150},this.getColumnSearchProps("quantity_volume"),{sorter:function(e,t){return e.quantity_volume-t.quantity_volume},sortOrder:"quantity_volume"===e.columnKey&&e.order})],n=this.props.frozenItemStock;return n.length>0?(n.forEach((function(e,t){if(e.key=t+1,e.item_name="FROZEN ".concat(e.item_name),e.productType="alive"===e.group?"BAHAN DASAR":"HASIL CUTTING","HASIL CUTTING"===e.productType){var n="whole"===e.group?"":" OLAHAN",a="main"===e.type?" UTAMA":" SAMPINGAN";e.productType="".concat(e.productType).concat(n).concat(a)}})),r.a.createElement("div",{className:"mb-4 kit__utils__scrollTable"},r.a.createElement(_.a,{columns:t,dataSource:n,onChange:this.handleChange,scroll:{x:1500,y:300}}))):r.a.createElement("div",{className:"mb-4 kit__utils__scrollTable"},r.a.createElement(_.a,{columns:t,scroll:{x:1500,y:300}}))}}]),n}(r.a.Component),E=Object(h.c)((function(e){return{frozenItemStock:e.storage.frozenItemStock}}),(function(e){return{getFrozenItemStock:function(){return e({type:"storage/GET_FROZEN_ITEM_STOCK"})},resetFrozenItemStock:function(){return e({type:"storage/SET_STATE",payload:{frozenItemStock:[]}})}}}))(S);t.default=function(){return r.a.createElement("div",null,r.a.createElement(c.a,{title:"Gudang / Frozen"}),r.a.createElement("div",{className:"kit__utils__heading"},r.a.createElement("h5",null,r.a.createElement("span",{className:"mr-3"},"Gudang Frozen"))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"px-4"},r.a.createElement("br",null),r.a.createElement(o.a,{to:"/"},r.a.createElement(l.a,{type:"primary",size:"large",style:{width:150,marginRight:8}},"Buat Surat Jalan"))),r.a.createElement("div",{className:"card-body"},r.a.createElement(E,null))))}}}]);
//# sourceMappingURL=29.e11fae6e.chunk.js.map