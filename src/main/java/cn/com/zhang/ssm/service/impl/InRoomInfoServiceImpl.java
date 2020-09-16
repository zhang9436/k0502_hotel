package cn.com.zhang.ssm.service.impl;

import cn.com.zhang.ssm.entity.InRoomInfo;
import cn.com.zhang.ssm.entity.Rooms;
import cn.com.zhang.ssm.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *  入住信息业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService {

    //执行添加，1.入住信息添加  2.客房状态由0（空闲）---->1（已入住）
    //重写父类中的添加入住信息的方法
    @Override
    public String saveT(InRoomInfo inRoomInfo) throws Exception {
        //1.完成入住信息的添加
        int insINICount = baseMapper.insert(inRoomInfo);
        //出现异常
       // int i = 10/0;  //报异常
        //2.完成客房状态的修改
        //2.1.新建客房对象
        Rooms rooms = new Rooms();
        //2.2.设置修改的客房对象的数据
        rooms.setId(inRoomInfo.getRoomId());
        rooms.setRoomStatus("1");  //客房状态由0（空闲）-->1（已入住）
        //2.3.执行修改客房数据
        int updRoomsCount = roomsMapper.updateByPrimaryKeySelective(rooms);
        if(insINICount>0&&updRoomsCount>0){
            return "success";
        }else {
            return "fail";
        }
    }
}
