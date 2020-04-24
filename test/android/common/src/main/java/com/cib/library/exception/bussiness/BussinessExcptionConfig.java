package com.cib.library.exception.bussiness;
/**
 * Created by admin on 2019/5/22.
 */

import com.cib.library.R;

import java.util.HashMap;
import java.util.Map;


/**
 * @author xiezhihua
 * @version 1.0.0
 * @create 2019/5/22
 */
public class BussinessExcptionConfig {
    public static final int CODE_QR_GENERATE = 8200;
    private static Map<Integer, Integer> map = new HashMap<>();

    static {
        map.put(CODE_QR_GENERATE, R.string.exception_qr_generate_code);
    }


    public static int getErrorMessage(int code) {
        Integer integer = map.get(code);
        if (integer == null) {
            return 0;
        }
        return integer;
    }
}
