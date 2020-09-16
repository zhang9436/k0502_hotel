package cn.com.zhang.ssm.controller;

import cn.com.zhang.ssm.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 *  消费记录控制器
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {

    //加载不可客房的出租销售记录数据
    @RequestMapping("/loadRoomSale")
    public @ResponseBody Map<String,Object> loadRoomSale(){
        try {
            return roomSaleService.findRoomSale();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
