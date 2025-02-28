package com.gdu.library_management.dto.request;

import lombok.Data;

@Data
public class CreateMemberDTO {
    private String name;
    private String email;
    private String phone;
    private String address;
}
