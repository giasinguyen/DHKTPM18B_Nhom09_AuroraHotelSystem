package com.aurora.backend.mapper;

import com.aurora.backend.dto.request.UserCreationRequest;
import com.aurora.backend.dto.response.UserResponse;
import com.aurora.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

}
