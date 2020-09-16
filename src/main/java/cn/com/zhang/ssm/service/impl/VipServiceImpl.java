package cn.com.zhang.ssm.service.impl;

import cn.com.zhang.ssm.entity.Vip;
import cn.com.zhang.ssm.service.VipService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *  会员业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class VipServiceImpl extends BaseServiceImpl<Vip> implements VipService {

}
