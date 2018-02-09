$(function () {
    var map = null;
    var data_logo = getQueryString("data_logo");
    if(data_logo != null && data_logo != "" && data_logo.indexOf("SURF") < 0)
        $(".airPress").show();
    else
        $(".airPress").hide();
    var options = "<option value=" + data_logo + ">" + data_logo + "</option>";
    var dataTypeSel = $("#dataType");
    dataTypeSel.append(options);
    dataTypeSel.attr("disabled", false);
    var qualiteTypeValueArray = new Array();  //定义数组
    dataTypeChange();
    var zoom = 4;
    //初始化地图对象
    $("#bin_map_dc").html("");
    $('#binMapQuery').click(binMapListener);

    function dataTypeChange() {
        var dataType = $("#dataType option:selected").val();
        if (dataType == "无")
            return;
        $.ajax({
            type: "post",
            async: true,
            url: "/getQualiteTypes",
            data: {
                dataType: dataType,
            },
            dataType: "json",
            success: function (data) {
                var options = "<option value=''>无</option>";
                options += "<option value='all'>all</option>";
                for (i in data) {
                    var qc = data[i].quality_code_comment
                    if (qc == "")
                        qc = data[i].quality_code
                    if (qc == "")
                        continue
                    if(data[i].quality_code!=''){
                        qualiteTypeValueArray.push(data[i].quality_code);  //添加到数组中
                    }
                    options += "<option value=" + data[i].quality_code + ">" + qc + "</option>"
                }
                $("#qualiteType").html("");
                $("#qualiteType").append(options);
                $("#qualiteType").attr("disabled", false);
            }
        });
    };
    function binMapListener() {
        var dataType = $("#dataType option:selected").val();
        var qualiteType = $("#qualiteType option:selected").val();
        if (qualiteType == undefined || qualiteType == "" || qualiteType == "无")
            return
        var prs = $("#prs option:selected").val();
        if (qualiteType == undefined || qualiteType == "")
            return
        var sdid = $("#timeHour option:selected").val();
        map = new T.Map('bin_map_dc');
        //设置显示地图的中心点和级别
        map.centerAndZoom(new T.LngLat(116.40969, 39.90940), zoom);
        map.removeEventListener("moveend", MapMoveend);
        map.addEventListener("moveend", MapMoveend);
        var llb = map.getBounds();
        //让所有点在视野范围内
        $.ajax({
            type: "post",
            async: true,
            url: "/getElements",
            data: {
                dataType: dataType,
                qualiteType: qualiteType,
                sdid: sdid,
                neLon: llb.getNorthEast().getLng(),
                neLat: llb.getNorthEast().getLat(),
                swLon: llb.getSouthWest().getLng(),
                swLat: llb.getSouthWest().getLat(),
                prs: prs
            },
            dataType: "json",
            success: function (data) {
                var dotColor = "#999999";
                var qt = qualiteType.toLocaleLowerCase();
                for (var ki in data) {
                    var binMap = data[ki];
                    if(qt == 'all'){
                        dotColor = "#00FF66";
                        for(var qtv in qualiteTypeValueArray){
                            if(binMap[qtv] != 0 && binMap[qtv] != 3 && binMap[qtv] != 4) {
                                dotColor = "#999999";
                                break;
                            }
                        }
                    }
                    else if(binMap[qt] == 0 || binMap[qt] == 3 || binMap[qt] == 4){
                        dotColor = "#00FF66";
                    }
                    var point = new T.Circle(new T.LngLat(binMap['lon'], binMap['lat']), 1, {
                        color: dotColor,
                        weight: 15,
                        opacity: 1,
                        fillColor: dotColor,
                        fillOpacity: 0,
                        lineStyle: "solid"
                    });
                    map.addOverLay(point);    //增加点
                    var prsv = binMap['prs'];
                    var prs_hwc = (prsv == undefined || prsv == "") ? binMap['prs_hwc'] : prsv;
                    var sContent = "<div>"
                        + "<ul>"
                        + "<li>" + "<span>tem:</span>" + binMap['tem'] + "</li>"
                        + "<li>" + "<span>prs:</span>" + prs_hwc + "</li>"
                        + "<li>" + "<span>dpt:</span>" + binMap['dpt'] + "</li>"
                        + "<li>" + "<span>q_tem:</span>" + binMap['q_tem'] + "</li>"
                        + "<li>" + "<span>q_dpt:</span>" + binMap['q_dpt'] + "</li>"
                        + "</ul>"
                        + "</div>";
                    point.addEventListener("click", function (e) {
                        var point1 = e.lnglat;
                        var infoWin = new T.InfoWindow(sContent, {offset: new T.Point(0, -30)}); // 创建信息窗口对象
                        map.openInfoWindow(infoWin, point1); //开启信息窗口
                    });// 将标注添加到地图中
                }
            }
        });
    };
    function MapMoveend(e) {
        var dataType = $("#dataType option:selected").val();
        var qualiteType = $("#qualiteType option:selected").val();
        if (qualiteType == undefined || qualiteType == "")
            return
        var prs = $("#prs option:selected").val();
        //让所有点在视野范围内
        var llb = map.getBounds();
        var old_zoom = map.getZoom();
        var sdid = $("#timeHour option:selected").val();
        $("#bin_map_dc").html("");
        map.removeEventListener("moveend", MapMoveend);
        map.addEventListener("moveend", MapMoveend);
        $.ajax({
            type: "post",
            async: true,
            url: "/getElements",
            data: {
                dataType: dataType,
                qualiteType: qualiteType,
                sdid: sdid,
                neLon: llb.getNorthEast().getLng(),
                neLat: llb.getNorthEast().getLat(),
                swLon: llb.getSouthWest().getLng(),
                swLat: llb.getSouthWest().getLat(),
                prs: prs
            },
            dataType: "json",
            success: function (data) {
                var dotColor = "#999999";
                var qt = qualiteType.toLocaleLowerCase();
                for (var ki in data) {
                    var binMap = data[ki];
                    if(qt == 'all'){
                        dotColor = "#00FF66";
                        for(var qtv in qualiteTypeValueArray){
                            if(binMap[qtv] != 0 && binMap[qtv] != 3 && binMap[qtv] != 4) {
                                dotColor = "#999999";
                                break;
                            }
                        }
                    }
                    else if(binMap[qt] == 0 || binMap[qt] == 3 || binMap[qt] == 4){
                        dotColor = "#00FF66";
                    }
                    var point = new T.Circle(new T.LngLat(binMap['lon'], binMap['lat']), 1, {
                        color: dotColor,
                        weight: 3.5,
                        opacity: 1,
                        fillColor: dotColor,
                        fillOpacity: 0,
                        lineStyle: "solid"
                    });
                    map.addOverLay(point);    //增加点
                    var prsv = binMap['prs'];
                    var prs_hwc = (prsv == undefined || prsv == "") ? binMap['prs_hwc'] : prsv;
                    var sContent = "<div>"
                        + "<ul>"
                        + "<li>" + "<span>tem:</span>" + binMap['tem'] + "</li>"
                        + "<li>" + "<span>prs:</span>" + prs_hwc + "</li>"
                        + "<li>" + "<span>dpt:</span>" + binMap['dpt'] + "</li>"
                        + "<li>" + "<span>q_tem:</span>" + binMap['q_tem'] + "</li>"
                        + "<li>" + "<span>q_dpt:</span>" + binMap['q_dpt'] + "</li>"
                        + "</ul>"
                        + "</div>";
                    point.addEventListener("click", function (e) {
                        var point1 = e.lnglat;
                        var infoWin = new T.InfoWindow(sContent, {offset: new T.Point(0, -30)}); // 创建信息窗口对象
                        map.openInfoWindow(infoWin, point1); //开启信息窗口
                    });// 将标注添加到地图中
                }
            }
        });
    }
});
function timeHourChange() {
    var dataType = $("#dataType option:selected").val();
    var startTime = $("#start").val();
    if (dataType == "无")
        return;
    $.ajax({
        type: "post",
        async: true,
        url: "/getTimeHours",
        data: {
            dataType: dataType,
            startTime: startTime,
        },
        dataType: "json",
        success: function (data) {
            var options;
            for(var key in data){
                options += "<option value=" + key + ">" + data[key] + "</option>"
            };
            $("#timeHour").html("");
            $("#timeHour").append(options);
            $("#timeHour").attr("disabled", false);
        }
    });
}
