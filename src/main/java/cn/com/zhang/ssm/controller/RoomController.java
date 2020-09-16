package cn.com.zhang.ssm.controller;

import cn.com.zhang.ssm.entity.Rooms;
import cn.com.zhang.ssm.utils.QiniuUploadUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 *  客房控制器层
 */
@Controller
@RequestMapping("/rooms")
public class RoomController extends BaseController<Rooms> {

    //文件上传
    @RequestMapping("/upload")
    public @ResponseBody Map<String,Object> upload(String path, MultipartFile myFile) {
       // Map<String,Object> map = new HashMap<String, Object>();
        try {
            return QiniuUploadUtils.upload(myFile);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
       /* try {
            //1.获取源文件的输入流
            InputStream is = myFile.getInputStream();
            //2.获取源文件类型，文件后缀名
            String originalFileName = myFile.getOriginalFilename();
            //3.定义上传后的目标文件名(为了避免文件名称重复，此时使用UUID)
            String newFileName = UUID.randomUUID().toString()+originalFileName;
            //4.通过上传路径得到上传的文件夹
            File file = new File(path);
            //4.1.若目标文件夹不存在，则创建
            if(!file.exists()){ //判断目标文件夹是否存在
                file.mkdirs();//4.2.不存在，则创建文件夹
            }
            //5.根据目标文件夹和目标文件名新建目标文件（上传后的文件）
            File newFile = new File(path,newFileName);  //空的目标文件
            //6.根据目标文件的新建其输出流对象
            FileOutputStream os = new FileOutputStream(newFile);
            //7.完成输入流到输出流的复制
            IOUtils.copy(is,os);
            //8.关闭流（先开后关）
            os.close();
            is.close();
            map.put("code",200);  //上传状态成功
            map.put("newFileName",newFileName);  //装上传后的目标文件名字
        } catch (IOException e) {
            e.printStackTrace();
            map.put("code",0);
        }*/

      //  return map;
    }


}
