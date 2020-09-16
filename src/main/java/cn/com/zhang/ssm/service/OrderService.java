package cn.com.zhang.ssm.service;

import cn.com.zhang.ssm.entity.Orders;

/**
 *  订单业务层接口
 */
public interface OrderService extends BaseService<Orders> {

    //订单支付成功后的回调业务(1.订单状态的修改：未支付0-->已支付1；2.消费记录的生成)
    String afterOrdersPay(String orderNum) throws Exception;
}
