package com.hx.syncer;

import com.hx.syncer.bean.GridDataHeadDo;
import com.hx.syncer.dao.GridDataHeadDao;
import com.hx.syncer.service.GridDataHeadService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.Assert;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by yahchen on 2017/10/29.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class SqlTest {
    @Autowired
    private GridDataHeadDao gridDataHeadDao;

    @Test
    public void testSql(){
        Assert.notNull(gridDataHeadDao,"template is null");
        GridDataHeadDo entity = new GridDataHeadDo();
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        entity.setData_code("232332");
        entity.setData_end_time(ts);
        entity.setData_logo("rese");
        entity.setData_name("sdfsds");
        entity.setData_num("sdfsd");
        entity.setData_start_time(ts);
        entity.setData_type(1);
        entity.setElements("");
        entity.setData_time(ts);
        entity.setFcstLevel("sds");
        entity.setFile_path("sdsd");
        entity.setG_d_id(3);
        entity.setGridfile_state("");
        entity.setGridfileNumMax(121);
        entity.setLongitude_latitude_scope("");
        entity.setRetrieve_end_time(ts);
        entity.setRetrieve_process_time(32323);
        entity.setRetrieve_start_time(ts);
        entity.setReturn_abnormal_info("sdsd");
        entity.setValidTime("sds");
        entity.setUser_id("sd");
        entity.setSystem_name("sdds");
        entity.setSite_type(2);
        entity.setSys_conn_state("sd");
        Object resutl = gridDataHeadDao.save(entity);
        Assert.notNull(resutl);
    }

    @Test
    public void query(){
        List<GridDataHeadDo> ress = gridDataHeadDao.findAll();
        Assert.notNull(ress);
    }
}
