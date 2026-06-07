import os
import re
import time
import random
import yt_dlp

# 유튜브 강의 동영상 ID 목록 (1강 ~ 34강)
video_ids = {
    1: "KR4JF47GdFM",
    2: "2MlLZ_RNPaI",
    3: "nJgAwvEtuM4",
    4: "9wXh-eZpcAw",
    5: "lf-jaEF0Dhs",
    6: "E6e1KuYFyW8",
    7: "h1jaHMzaCWg",
    8: "-GAttuheYhk",
    9: "NZ8s1yx5kyg",
    10: "5sXKgcSgH6o",
    11: "JdlCwvVeUCc",
    12: "A-rwQQGgFVM",
    13: "Fy2E8WCuOyA",
    14: "RyqGzKsnk20",
    15: "x_2zV6CH7vM",
    16: "A6U3zcmb8xU",
    17: "Aw5Xoj36w0U",
    18: "cbjwdDFOF6c",
    19: "-TDVnVE1MTg",
    20: "UYiWSNT0TV8",
    21: "GEOhLyW5uuo",
    22: "iVtlLTq3fto",
    23: "MWhp8_oimKM",
    24: "9oH3IyG6DAI",
    25: "s3zytXUNgfo",
    26: "tSD24uVvwIQ",
    27: "X0U-00O2kG0",
    28: "H0VfBU_ql80",
    29: "eK3hFX9VYCU",
    30: "ANpK1q77N2k",
    31: "arF4y8w838o",
    32: "YbgAa4DKqr8",
    33: "Hs5gIwSdjWY",
    34: "kNUmrq0kvRI"
}

# 자막을 저장할 폴더 생성
os.makedirs("subtitles", exist_ok=True)

def clean_vtt(vtt_content):
    """
    VTT 파일의 타임스탬프, 메타데이터, HTML 태그들을 지우고 
    자막 텍스트만 자연스러운 한국어 문장으로 결합해 주는 함수
    """
    lines = vtt_content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        # VTT 헤더 정보는 건너뜁니다
        if line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:') or line.startswith('Style:'):
            continue
        # 타임스탬프 줄 (00:01:23.000 --> 00:01:25.000) 건너뜁니다
        if '-->' in line:
            continue
        # 빈 줄은 패스
        if not line:
            continue
        # <c> 또는 </c> 같은 HTML 스타일 포맷팅 태그 제거
        line = re.sub(r'<[^>]+>', '', line)
        cleaned_lines.append(line)
        
    # 유튜브 자동 자막 특성상 이전 대사와 겹치는 문장들이 중복되므로, 중복 문장들을 제거합니다
    final_lines = []
    for line in cleaned_lines:
        if not final_lines or final_lines[-1] != line:
            final_lines.append(line)
            
    return " ".join(final_lines)

# 각 강좌를 돌며 yt-dlp로 자막을 긁어옵니다
for lec_num, vid_id in video_ids.items():
    txt_path = f"subtitles/lec_{lec_num}.txt"
    
    # 이미 다운로드된 순수 텍스트 파일이 있다면 건너뜁니다.
    if os.path.exists(txt_path) and os.path.getsize(txt_path) > 0:
        print(f"[건너뛰기] {lec_num}강 자막 파일이 이미 존재합니다.")
        continue

    print(f"[{lec_num}강 자막 수집 중] (ID: {vid_id})...")
    
    # 임시 자막 파일 저장 위치 설정 (yt-dlp는 기본적으로 vtt 포맷으로 자막을 저장합니다)
    temp_vtt_name = f"subtitles/temp_lec_{lec_num}"
    temp_vtt_file = f"{temp_vtt_name}.ko.vtt"

    ydl_opts = {
        'writeautomaticsub': True,       # 자동 자막 포함 다운로드 허용
        'subtitleslangs': ['ko'],        # 한국어 자막 타겟
        'skip_download': True,           # 비디오 파일은 다운로드 받지 않음
        'outtmpl': temp_vtt_name,        # 임시 저장 파일명 템플릿
        'quiet': True,                   # 터미널에 복잡한 디버그 로그 출력을 끎
        'noprogress': True,
    }

    try:
        # 1. yt-dlp를 이용하여 해당 동영상의 자막 파일(.vtt)을 다운로드합니다.
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([f'https://www.youtube.com/watch?v={vid_id}'])
        
        # 2. 다운로드된 .vtt 파일을 열어 자막을 텍스트 형태로 변환합니다.
        if os.path.exists(temp_vtt_file):
            with open(temp_vtt_file, "r", encoding="utf-8") as vf:
                vtt_content = vf.read()
            
            # 깨끗한 텍스트로 정제합니다
            cleaned_text = clean_vtt(vtt_content)
            
            # 정제된 자막을 .txt 파일로 저장합니다
            with open(txt_path, "w", encoding="utf-8") as tf:
                tf.write(cleaned_text)
                
            print(f"-> {lec_num}강 성공적으로 정제 및 저장 완료! (글자 수: {len(cleaned_text)})")
            
            # 임시 다운로드한 vtt 파일은 지워줍니다.
            os.remove(temp_vtt_file)
        else:
            # 혹시 한글 자동자막이 아예 없는 비디오의 경우, 영어 자막(en)을 재시도합니다.
            ydl_opts['subtitleslangs'] = ['en']
            temp_vtt_file_en = f"{temp_vtt_name}.en.vtt"
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([f'https://www.youtube.com/watch?v={vid_id}'])
                
            if os.path.exists(temp_vtt_file_en):
                with open(temp_vtt_file_en, "r", encoding="utf-8") as vf:
                    vtt_content = vf.read()
                cleaned_text = clean_vtt(vtt_content)
                with open(txt_path, "w", encoding="utf-8") as tf:
                    tf.write(cleaned_text)
                print(f"-> {lec_num}강 영어 자막으로 저장 완료! (글자 수: {len(cleaned_text)})")
                os.remove(temp_vtt_file_en)
            else:
                print(f"-> {lec_num}강 실패: 한국어 또는 영어 자막을 찾을 수 없습니다.")
                
        # 유튜브 서버 부하 방지를 위해 랜덤하게 대기시간을 가집니다.
        time.sleep(random.uniform(2.0, 4.0))

    except Exception as e:
        print(f"-> {lec_num}강 예외 발생: {e}")
        # 오류 발생 시에도 3초 대기
        time.sleep(3)

print("모든 강의의 자막 수집 및 정제 작업이 성공적으로 완료되었습니다!")
