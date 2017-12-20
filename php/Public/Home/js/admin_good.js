/**
 * Created by Administrator on 2017-6-21 0021.
 */
(function($){

    //方法
    $.fn.addGoodsSpec = function(options , param){
        //是否直接执行方法
        if (typeof options == 'string') {
            return $.fn.addGoodsSpec.methods[options](param);
        }

        //合并参数
        options = $.extend({}, $.fn.addGoodsSpec.defaults, options || {});

        if (!options.url) return;

        options.onBeforeLoad.call({}, options.param);
        init(options);

        //初始化规格列
        function init(options) {
            $.ajax({
                type:'POST',
                data:options.spec_arr,
                url:options.url,
                success:function(data){
                    options.div_spec_table.html('');
                    options.div_spec_table.append(data);
                    hbdyg(options.input_spec_table);
                }
            });
            options.onLoadSuccess.call({});
        }

        // 合并单元格
        function hbdyg(input_spec_table) {
            var tab = document.getElementById(input_spec_table); //要合并的tableID
            var maxCol = 2, val, count, start;  //maxCol：合并单元格作用到多少列
            if (tab != null) {
                for (var col = maxCol - 1; col >= 0; col--) {
                    count = 1;
                    val = "";
                    for (var i = 0; i < tab.rows.length; i++) {
                        if (val == tab.rows[i].cells[col].innerHTML) {
                            count++;
                        } else {
                            if (count > 1) { //合并
                                start = i - count;
                                tab.rows[start].cells[col].rowSpan = count;
                                for (var j = start + 1; j < i; j++) {
                                    tab.rows[j].cells[col].style.display = "none";
                                }
                                count = 1;
                            }
                            val = tab.rows[i].cells[col].innerHTML;
                        }
                    }
                    if (count > 1) { //合并，最后几行相同的情况下
                        start = i - count;
                        tab.rows[start].cells[col].rowSpan = count;
                        for (var j = start + 1; j < i; j++) {
                            tab.rows[j].cells[col].style.display = "none";
                        }
                    }
                }
            }
        }
        //alert(options.url);

    };

    $.fn.addGoodsSpec.methods = {
        //删除指定规格
        delSpecList: function(param){
            $(param.parent+"["+param.attrVal+"="+param.keyId+"]").remove();
        },
        //添加指定规格
        addSpecList: function(param){
            var index;
            $.ajax({
                type:'POST',
                data:param.spec_param,
                url:param.rq_url,
                beforeSend:function()
                {
                    index = param.jq_layer.load();
                },
                success:function(data){
//                        console.log(data)
                    var inputDom = '';

                    jQuery.each(data, function(i, val) {
                        inputDom += '<input type="checkbox" lay-filter="specCheckBox" spec_id="'+param.spec_param.spec_id+'" attr_id="'+val.id+'" title="'+val.attr_name+'">';
                    });

                    inputDom += '<button class="layui-btn layui-btn-small" type="button" name="delSpecBtn" spec_id="'+param.spec_param.spec_id+'">'
                        +'<i class="layui-icon">&#xe640;</i> 删除'
                        +'</button>';

                    var dom = '<tr specId="'+param.spec_param.spec_id+'">'
                        +'<td>'+param.spec_name+'</td>'
                        +'<td>'
                        + inputDom
                        +'</td>'
                        +'</tr>';

                    param.obj_dom.append(dom);
                    param.jq_layer.close(index);
                    param.onLoadSuccess.call();
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    alert(textStatus);
                    param.jq_layer.close(index);
                }
            });
        },
        getValue: function (jq) {
            return jq.val();
        },
        setValue: function (jq, param) {
            jq.val(param);
        },
        load: function (jq, url) {
            $.getJSON(url, function (data) {
                jq.empty();
                var option = $('<option></option>');
                option.attr('value', '');
                option.text('请选择');
                jq.append(option);
                $.each(data, function (i, item) {
                    var option = $('<option></option>');
                    option.attr('value', item[jq.attr('valuefield')]);
                    option.text(item[jq.attr('textfield')]);
                    jq.append(option);
                });
            });
        }
    };

    //默认参数
    $.fn.addGoodsSpec.defaults = {
        url: null,
        spec_list_box: null,
        spec_list_box_type: null,
        div_spec_table: null,
        input_spec_table: null,
        spec_arr: null,
        param: null,
        data: null,
        valueField: 'value',
        textField: 'text',
        placeholder: '请选择',
        onBeforeLoad: function (param) { },
        onLoadSuccess: function () { },
        onChange: function (value) { }
    };

})(jQuery);