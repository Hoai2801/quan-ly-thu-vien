package com.gdu.library_management.controller;

import com.gdu.library_management.dto.request.CreateMemberDTO;
import com.gdu.library_management.entity.Member;
import com.gdu.library_management.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/members")
@RequiredArgsConstructor
@CrossOrigin
public class MemberController {
    private final MemberService memberService; 
    
    @PostMapping
    ResponseEntity<String> insertMember(@RequestBody CreateMemberDTO createMemberDTO) {
        return memberService.insertMember(createMemberDTO);
    }
    
    @GetMapping
    ResponseEntity<List<Member>> getMembers() {
        return memberService.getMembers();
    }
    
    @PutMapping("/{id}")
    ResponseEntity<String> updateMember(@PathVariable Integer id, @RequestBody CreateMemberDTO createMemberDTO) {
        return memberService.updateMember(id, createMemberDTO);
    }
    
    @GetMapping("/total")
    ResponseEntity<Integer> getTotalMembers() {
        return ResponseEntity.ok(memberService.getTotalMembers());
    }
    
    @PutMapping("/ban/{id}")
    ResponseEntity<String> banMember(@PathVariable Integer id) {
        return memberService.banMember(id);
    }
}
