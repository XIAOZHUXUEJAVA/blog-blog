---
title: 每日小知识点(三) - HTTP 状态码
date: '2023-03-23'
tags: ['network', 'daily']
draft: false
summary: Daily Little Knowledge Points
---

# 每日小知识点(三) - HTTP 状态码

HTTP 状态码是用来表示 HTTP 请求的响应状态的数字代码。

## 2xx

- **200 OK** ：请求成功，服务器成功地返回了请求地数据。比如 GET 请求指定用户信息
- **201 Created** ：请求成功并且服务器创建了一个新的资源。比如我们通过 POST 请求创建一个新的用户。
- **202 Accepted** ：服务端已经接收到了请求，但是还未处理。
- **204 No Content** ： 服务端已经成功处理了请求，但是响应不含有任何实体内容。

## 3xx

- **301 Moved Permanently** ： 资源被永久重定向了。比如网站的网址更换了。
- **302 Found** ：资源被临时重定向了。比如你的网站的某些资源被暂时转移到另外一个网址。

## 4xx

- **400 Bad Request** ： 服务器无法理解请求地语法。通常是由于请求的参数或数据格式错误导致的
- **401 Unauthorized** ： 请求未经过授权认证，比如我们的管理员登录和普通用户登录时
- **403 Forbidden** ：直接拒绝 HTTP 请求，不处理。一般用来针对非法请求。
- **404 Not Found** ： 服务器无法找到请求的资源，这时候我们就应该注意自己的 url 路径相关是否正确。
- **409 Conflict** ： 表示请求的资源与服务端当前的状态存在冲突，请求无法被处理。

## 5xx

- **500 Internal Server Error** ： 一般情况下就是你的服务端代码出现了问题。
- **502 Bad Gateway** ：我们的网关将请求转发到服务端，但是服务端返回的却是一个错误的响应。也就是说我们服务器作为网关或者代理的时候，从上游服务器接收到的响应无效。
- **503 Service Unavailable** : 服务器暂时无法处理请求。通常是由于过多的请求导致服务器负载过高或正在维护。

## 一些处理状态码和异常的小技巧

```java

/**
 * 响应枚举，用于异常的信息设置
 * @author xiaozhu
 * @date 2022年10月03日 23:40                          $
 */
public enum AppHttpCodeEnum {
    // 成功
    SUCCESS(200,"操作成功"),
    // 登录
    NEED_LOGIN(401,"需要登录后操作"),
    NO_OPERATOR_AUTH(403,"无权限操作"),
    SYSTEM_ERROR(500,"出现错误"),
    USERNAME_EXIST(501,"用户名已存在"),
    PHONENUMBER_EXIST(502,"手机号已存在"), EMAIL_EXIST(503, "邮箱已存在"),
    REQUIRE_USERNAME(504, "必需填写用户名"),
    NO_USER_ERROR(519,"用户不存在"),
    CONTENT_NOT_NULL(519,"评论不能为空"),
    PARAMETER_ERROR(1001, "请求参数有误!"),
    LOGIN_ERROR(505,"用户名或密码错误");


    int code;
    String msg;

    AppHttpCodeEnum(int code, String errorMessage){
        this.code = code;
        this.msg = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
```

```java
/**
 * 全局异常
 * @author xiaozhu
 * @date 2022年10月03日 23:40                          $
 */
public class SystemException extends RuntimeException{

    private int code;

    private String msg;

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public SystemException(AppHttpCodeEnum httpCodeEnum) {
        super(httpCodeEnum.getMsg());
        this.code = httpCodeEnum.getCode();
        this.msg = httpCodeEnum.getMsg();
    }

}
```

枚举类`AppHttpCodeEnum`中定义了一些常用的 HTTP 返回码，如成功返回码`SUCCESS`、需要登录返回码`NEED_LOGIN`等。每个返回码都有一个对应的状态码和错误信息，通过调用`getCode()`和`getMsg()`方法可以获取相应的状态码和错误信息。

自定义异常类`SystemException`继承了 Java 的 RuntimeException 类，用于在程序运行过程中抛出异常。当抛出这个异常时，会调用`AppHttpCodeEnum`中定义的错误信息，并返回对应的状态码。同时，这个异常类还提供了获取状态码和错误信息的方法`getCode()`和`getMsg()`，方便在程序中获取异常的信息。

这样设计的好处在于，**当程序发生异常时，可以直接抛出`SystemException`异常，通过捕获异常获取到对应的状态码和错误信息，从而快速定位和解决问题。同时，使用枚举类定义 HTTP 返回码，可以方便地管理和扩展状态码。**

```java
/**
 * 全局捕获异常
 *
 * @author xiaozhu
 * @date 2022年10月03日 23:40                          $
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(SystemException.class)
    public ResponseResult systemExceptionHandler(SystemException e) {
        //打印异常信息
        log.error("出现了异常！ : {}", e);
        //从异常对象中获取提示信息封装返回
        return ResponseResult.errorResult(e.getCode(), e.getMsg());
    }


    @ExceptionHandler(Exception.class)
    public ResponseResult exceptionHandler(Exception e) {
        //打印异常信息
        log.error("出现了异常！ : {}", e);
        //从异常对象中获取提示信息封装返回
        return ResponseResult.errorResult(AppHttpCodeEnum.SYSTEM_ERROR.getCode(), e.getMessage());
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseResult parameterExceptionHandler(MethodArgumentNotValidException e) {
        log.error("参数出现了异常！ : {}", e);
        // 获取异常信息
        BindingResult exceptions = e.getBindingResult();
        // 判断异常中是否有错误信息，如果存在就使用异常中的消息，否则使用默认消息
        if (exceptions.hasErrors()) {
            List<ObjectError> errors = exceptions.getAllErrors();
            if (!errors.isEmpty()) {
                // 这里列出了全部错误参数，按正常逻辑，只需要第一条错误即可
                FieldError fieldError = (FieldError) errors.get(0);
                return ResponseResult.errorResult(AppHttpCodeEnum.PARAMETER_ERROR.getCode(), fieldError.getDefaultMessage());
            }
        }
        return ResponseResult.okResult();
    }

}
```

```java
@PostMapping("/add")
    public  ResponseResult saveUser(@RequestBody @Valid User user) {
        userService.save(user);

        return ResponseResult.okResult();

    }
```

上述代码是一个全局异常处理器，用于捕获系统运行时抛出的异常，并返回统一的错误信息。这个异常处理器使用了 Spring 框架的@RestControllerAdvice 注解，表示这是一个全局的异常处理器，会对整个系统中的异常进行统一处理。同时，这个类还使用了 Lombok 的@Slf4j 注解，方便进行日志打印。

异常处理器中定义了三个异常处理方法，分别处理 SystemException、Exception 和 MethodArgumentNotValidException 三种异常。

- 对于 SystemException，直接从异常对象中获取状态码和错误信息并返回；

- 对于 Exception，返回系统错误的状态码和异常信息；

- 对于 MethodArgumentNotValidException，返回参数校验失败的状态码和异常信息。

其中，@ExceptionHandler 注解用于指定处理的异常类型，而@ResponseStatus 注解用于设置 HTTP 响应状态码。

在 UserController 中，@Valid 注解用于开启参数校验功能，表示对请求参数进行校验。如果请求参数不符合要求，则会抛出 MethodArgumentNotValidException 异常。注意到在 GlobalExceptionHandler 中已经定义了对这种异常的处理方法，所以这个异常不会被@Valid 注解捕获，而是会被全局异常处理器捕获并处理。
