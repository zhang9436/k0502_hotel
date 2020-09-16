package cn.com.zhang.ssm.test;

import cn.com.zhang.ssm.entity.InRoomInfo;
import cn.com.zhang.ssm.entity.RoomType;
import cn.com.zhang.ssm.entity.Rooms;
import cn.com.zhang.ssm.service.InRoomInfoService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.util.List;
import java.util.Map;

/**
 *  入住信息业务层测试类
 */
public class InRoomInfoServiceTest {

    //创建日志对象
    private final static Logger log = LogManager.getLogger(InRoomInfoServiceTest.class);

    //定义读取spring-config.xml文件的上下文对象
    private ApplicationContext applicationContext;

    //入住信息业务层对象
    private InRoomInfoService inRoomInfoService;

    @Before
    public void before(){
        //测试之前读取我们的spring-main.xml文件
        applicationContext = new ClassPathXmlApplicationContext("spring-main.xml");
        //从spring中的IOC容器中取出入住信息业务层对象
        inRoomInfoService = applicationContext.getBean("inRoomInfoServiceImpl", InRoomInfoService.class);
    }

    //测试分页查询
    @Test
    public void test01(){
        try {
            //新建查询的条件对象
            InRoomInfo praInRoomInfo = new InRoomInfo();
            //执行分页查询
            Map<String, Object> map = inRoomInfoService.findPageTByPramas(1,3,praInRoomInfo);
            log.info("总共有"+map.get("count")+"条数据");
            log.info("---------------------------------");
            List<InRoomInfo> inRoomInfos = (List<InRoomInfo>) map.get("data");
            for (InRoomInfo inRoomInfo:inRoomInfos) {
                log.info(inRoomInfo.getCustomerName()+"\t"+inRoomInfo.getIdcard());
                log.info("-------------------------------");
                Rooms rooms = inRoomInfo.getRooms();
                log.info(rooms.getRoomNum()+"\t"+rooms.getRoomPic());
                log.info("-------------------------------");
                RoomType roomType = rooms.getRoomType();
                log.info(roomType);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
