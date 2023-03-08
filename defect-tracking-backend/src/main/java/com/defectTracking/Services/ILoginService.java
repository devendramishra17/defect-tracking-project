package com.defectTracking.Services;

import com.defectTracking.Entity.User;

public interface ILoginService {

	User loginById(String userName, String password);

}
