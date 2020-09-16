package cn.com.zhang.ssm.controller;

import cn.com.zhang.ssm.entity.Vip;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  会员控制器
 */
@Controller
@RequestMapping("/vip")
public class VipController extends BaseController<Vip> {
}
