package cn.com.zhang.ssm.service;

import cn.com.zhang.ssm.entity.RoomSale;

import java.util.Map;

/**
 *  消费记录业务层接口
 */
public interface RoomSaleService extends BaseService<RoomSale> {

    //数据分析客房销售记录
    Map<String,Object> findRoomSale() throws Exception;
}
