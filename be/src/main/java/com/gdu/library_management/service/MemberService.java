package com.gdu.library_management.service;

import com.gdu.library_management.dto.request.CreateMemberDTO;
import com.gdu.library_management.entity.Member;
import com.gdu.library_management.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public ResponseEntity<String> insertMember(CreateMemberDTO createMemberDTO) {
        Member member = new Member();
        member.setName(createMemberDTO.getName());
        member.setEmail(createMemberDTO.getEmail());
        member.setPhone(createMemberDTO.getPhone());
        member.setAddress(createMemberDTO.getAddress());
        member.setMembershipDate(LocalDate.now());
        member.setActive(true);
        memberRepository.save(member);
        return ResponseEntity.ok("success");
    }

    public Integer getTotalMembers() {
        return memberRepository.totalMembers();
    }

    public ResponseEntity<List<Member>> getMembers() {
        List<Member> members = memberRepository.findAll();
        return ResponseEntity.ok(members);
    }

    public ResponseEntity<String> updateMember(Integer id, CreateMemberDTO createMemberDTO) {
        Member member = memberRepository.findById(id).orElse(null);
        assert member != null;
        member.setName(createMemberDTO.getName());
        member.setEmail(createMemberDTO.getEmail());
        member.setPhone(createMemberDTO.getPhone());
        member.setAddress(createMemberDTO.getAddress());
        memberRepository.save(member);
        return ResponseEntity.ok("success");
    }

    public ResponseEntity<String> banMember(Integer id) {
        Member member = memberRepository.findById(id).orElse(null);
        if (member == null) {
            return ResponseEntity.badRequest().body("Member not found");
        }
        member.setActive(!member.isActive());
        memberRepository.save(member);
        return ResponseEntity.ok("success");
    }
}
