package cn.com.zhang.ssm.service.impl;

import cn.com.zhang.ssm.entity.Rooms;
import cn.com.zhang.ssm.service.RoomService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *  客房业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomServiceImpl extends BaseServiceImpl<Rooms> implements RoomService {
}
