package com.hx.syncer.timerTask;

import com.hx.syncer.fileHandler.CommonDataFileVistor;
import com.hx.syncer.fileHandler.CommonDataTaskPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Created by yahchen on 2017/11/4.
 */
@Service
public class ScheduledTask {

    @Value("${spring.inbound.path}")
    private String inBoundFilePath;

    @Autowired
    private CommonDataTaskPool commonDataTaskPool;

    //第一次延迟10秒执行，当执行完后1小时再执行
    @Scheduled(initialDelay = 5000, fixedDelay = 3600000)
    public void syncGmSurfGl() {
        try {
            //遍历文件夹下面的文件
            List<Path> result = new LinkedList<Path>();
            Files.walkFileTree(Paths.get(inBoundFilePath),new CommonDataFileVistor(result));
            for(Path path:result){
                commonDataTaskPool.asyncSaveCommonDbData(path);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

//    //每天20点16分50秒时执行
//    @Scheduled(cron = "50 16 20 * * ?")
//    public void timerCron() {
//        System.out.println("current time : "+ dateFormat.format(new Date()));
//    }
}
