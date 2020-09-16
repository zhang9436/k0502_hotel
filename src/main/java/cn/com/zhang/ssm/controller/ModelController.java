package cn.com.zhang.ssm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  页面跳转的控制器
 */
@Controller
@RequestMapping("/model")
public class ModelController {

    //去到平台首页
    @RequestMapping("/toIndex")
    public String toIndex(){
        return "index";
    }

    //去到入住信息查询页面
    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inRoomInfo/showInRoomInfo";
    }

    //去到入住信息查询页面
    @RequestMapping("/toSaveInRoomInfo")
    public String toSaveInRoomInfo(){
        return "inRoomInfo/saveInRoomInfo";
    }

    //去到入住信息查询页面
    @RequestMapping("/toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }

    //去到支付页面
    @RequestMapping("/toOrdersPay")
    public String toOrdersPay(){
        //由于是服务器端转发到支付页面中，所以之前的请求参数（订单编号和金额均可以在页面中使用）
        return "alipay/ordersPay";
    }

    //支付失败去到失败提示页面
    @RequestMapping("/toErrorPay")
    public String toErrorPay(){
        return "errorPay";
    }

    //去到销售记录页面中
    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }

    //去到会员显示页面中
    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }

    //去到会员添加页面中
    @RequestMapping("/toSaveVip")
    public String toSaveVip(){
        return "vip/saveVip";
    }

    //去到客房显示页面中
    @RequestMapping("/toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    //去到客房显示页面中
    @RequestMapping("/toShowRoomType")
    public String toShowRoomType(){
        return "roomType/showRoomType";
    }

    //去到系统登录页面中
    @RequestMapping("/loginUI")
    public String loginUI(){
        return "login/login";
    }

    //去到客房销售数据分析页面中
    @RequestMapping("/toShowDbi")
    public String toShowDbi(){
        return "dbi/showDbi";
    }



}
