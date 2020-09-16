package cn.com.zhang.ssm.controller;

import cn.com.zhang.ssm.entity.User;
import cn.com.zhang.ssm.utils.MD5;
import cn.com.zhang.ssm.utils.VerifyCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 *  系统用户控制器
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User> {

    //获取随机验证码并响应回页面中
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpServletResponse response, HttpSession session){
        try {
            //1.产生随机验证码
            String verifyCode = VerifyCodeUtils.generateVerifyCode(5);
            //2.将产生的随机验证码转为小写存入到session容器中
            session.setAttribute("verifyCode",verifyCode.toLowerCase());
            //3.将随机验证码输出到页面中
            VerifyCodeUtils.outputImage(180,30,response.getOutputStream(),verifyCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //进行验证码的验证
    @RequestMapping("/verifyCheck")
    public @ResponseBody String verifyCheck(String userVerifyCode,HttpSession session){
        //1.取出session容器中的验证码（当初随机产生的验证码）
        String verifyCode = (String) session.getAttribute("verifyCode");
        //2.将页面传过来的验证码进行比对
        if(userVerifyCode.toLowerCase().equals(verifyCode)){
            return "success";
        }else {
            return "fail";
        }
    }

    //根据用户名和密码进行系统用户登录
    @RequestMapping("/login")
    public @ResponseBody String login(User user,HttpSession session){
        //将页面传送来的登录密码进行MD5加密，防止用户密码被泄漏
        user.setPwd(MD5.md5crypt(user.getPwd()));  //123456---->e10adc3949ba59abbe56e057f20f883e
        try {
            User loginUser = baseService.findOneByPramas(user);
            if(loginUser!=null){  //判断能查询到系统用户数据
                //将登录查询出的用户数据放入到session容器中
                session.setAttribute("loginUser",loginUser);
                return "success";
            }else {
                return "fail";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

}
