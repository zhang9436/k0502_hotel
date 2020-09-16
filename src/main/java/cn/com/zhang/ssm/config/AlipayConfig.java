package cn.com.zhang.ssm.config;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id ="2021000118645126";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key ="MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCgK4/7aEId/iqTzLd+0XXAIZ814W/Xp9RFQpjk/DyVJmcxbLfKc7ZooGohFcNUToEg99jsHKuqX/CeXDkAcznMCa7djmZrgHbzE1k1FC+20o4VQfj7D9qkfaFc3UfEPo1dZumLSSQWF0GqqQdp2uS0zA6t8bwIMcIPkSbLsxhte0lHHzZmATqfjme+re9Nq3jxnnC9qz+symgrz1LgS/v8azQr1f8aY4c/Mat9o5kX/4CW/OKWkFe838nQ1PSi2PmTdHh1fAu1HT4dvOY3d5XWd9GqVsuSXgCB3vNQp2vTvSKgPjVB92a7pdqogo/E9/DonkF+I+lPedYe3tk+0jNdAgMBAAECggEACvGvDuCa0+3P/vVX/GRXhV9Gv6m9uKCREoJwbAUIJrDPEEN7c2vgpNmBJu2TwSj0DcqhmdCDskqH6Goowu0cn+JxflYCjYnjlsxVphjRAc71QmKVnqIAsIidA/lis/gKNL2Za5j9zDyekgimpwb75Zaj0iLYVD8CIYorenOsUZ6lOUXttS8p6NnMwJj9MeThnTRatKb2mb1m3gT5plNQuCy5r9NpNoa0nYYMPKoR4Siixgh5LhxtPpb8Wxscq8qmn9A56c4Dopx8NFQ5g2ZOxL8UCXZKVObuh2QY2A3L/u+RZ8tnbSmNlxTX4trcIL7I1+5kqbi+ucJUnvuNTxxhAQKBgQDUM0EPTtwt7xYZqsr3P2HgHbgejlueVjQSgNydbGvCLUzOA8J2dFzMeAiAg8ER9P4R2fgqnMrAPdiyTPcFYe0wkelp9xUPigd9vcoSTEFjnONzkCHPeVIAl5Zob9P8nsTXVr2hTbvyZk6qQ3IQ6VyM8ozIH3efyTYDDy3KcyMRvQKBgQDBOwT4mydjWxO2GfYTN6xMN5poFHX5y3B0V9WSZCgVeqfW+bUIQH/5w7FbTMLwmW3T411CofvTAe4cxPR4v8JfGojJFu6BkEQgJHgKBYT28C8igIUIQ4IHGZU/wBbGofUv/0Bdf1L2++eKgmgFdGxOp1V4ctSCF6QTA8psg44yIQKBgFYxK3AIXC7cOmHame6r9BmQeMUQle5OnYAWj4XyECMjO1tC864hvb/f0bRB0B53IOwnWUIVxdUoSejCkmPBTxK3cdP05L0XF8vfV0DvcHABvfGmzdT0Nna/G/z3z2eBJftB5GysonbnT3ShSKfN4iXuL3jqLzDcDfBYLgVZlxkRAoGAc18j1rP8zovgtwfFLzA8hb1lSeN9lUnsuOqAsElwzXJQqECr4GNyhdRcHuE0O6fANZU5Z8GDtDcgzriiJz6HdXVIWpiAi4dxxadArOsiurYpznXh+E8mYcranBe7AZpN5PyIl8qf5Kv/UWoPZcJfsI6kr6gQTiSDaH8I68WYr0ECgYAKmXmwQAvFE3lZcU4LhHqMP8yVoMdEkWlPlidNXsJS3HEuwsgLlMzGJNtGH94g0XAdhr7Eh461K6bGNQDpCU0jU3MH40VZ/DfFw9CbL7iaI+1vFmUAFkESHDETofSTv2whV7YHjAG1VcAkZMN+hDAxom6WQ6iHQX39+3fFSalVXA==";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key ="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoCuP+2hCHf4qk8y3ftF1wCGfNeFv16fURUKY5Pw8lSZnMWy3ynO2aKBqIRXDVE6BIPfY7Byrql/wnlw5AHM5zAmu3Y5ma4B28xNZNRQvttKOFUH4+w/apH2hXN1HxD6NXWbpi0kkFhdBqqkHadrktMwOrfG8CDHCD5Emy7MYbXtJRx82ZgE6n45nvq3vTat48Z5wvas/rMpoK89S4Ev7/Gs0K9X/GmOHPzGrfaOZF/+AlvzilpBXvN/J0NT0otj5k3R4dXwLtR0+HbzmN3eV1nfRqlbLkl4Agd7zUKdr070ioD41Qfdmu6XaqIKPxPfw6J5BfiPpT3nWHt7ZPtIzXQIDAQAB";
    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "https://www.baidu.com";  //正常支付完成后回调地址，去百度（接入到项目中此处为具体的项目地址）

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

