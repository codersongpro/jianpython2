import re
import json

# content.md 파일 경로
file_path = r"C:\Users\dungs\.gemini\antigravity-ide\brain\9ed6c523-f279-4a2b-bdb4-d43b59992f43\.system_generated\steps\123\content.md"

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# 'ytInitialData = ' 뒤쪽의 JSON 영역을 정규식으로 파싱해보거나,
# playlistVideoRenderer 객체 패턴을 직접 추출합니다.
# "playlistVideoRenderer":{...}
renderers = re.findall(r'(\{"playlistVideoRenderer":\{.*?\})', content)

videos = []
if renderers:
    for r in renderers:
        try:
            # 괄호 매칭 등으로 완벽하지 않을 수 있으므로, 정규식으로 개별 필드 추출
            video_id_match = re.search(r'"videoId"\s*:\s*"([^"]+)"', r)
            title_match = re.search(r'"title"\s*:\s*\{"runs"\s*:\s*\[\s*\{\s*"text"\s*:\s*"([^"]+)"', r)
            
            if video_id_match and title_match:
                v_id = video_id_match.group(1)
                v_title = title_match.group(1)
                # 혹시 유니코드 이스케이프 해제
                v_title = v_title.encode().decode('unicode-escape', errors='ignore') if '\\u' in v_title else v_title
                videos.append((v_id, v_title))
        except Exception as e:
            continue

# 만약 playlistVideoRenderer로 못 찾았을 경우, fallback 정규식 매칭
if not videos:
    # watch?v=ID 링크들과 title들을 찾습니다.
    # 유튜브 재생목록 HTML 내의 텍스트 패턴 매칭
    matches = re.findall(r'/watch\?v=([a-zA-Z0-9_-]{11})', content)
    unique_ids = []
    for m in matches:
        if m not in unique_ids:
            unique_ids.append(m)
    
    # 단순 ID 목록만이라도 출력
    for uid in unique_ids:
        videos.append((uid, f"Video {uid}"))

# 중복 제거
seen = set()
unique_videos = []
for vid, title in videos:
    if vid not in seen:
        seen.add(vid)
        unique_videos.append((vid, title))

print(f"총 {len(unique_videos)}개의 동영상을 찾았습니다!")
for idx, (vid, title) in enumerate(unique_videos, 1):
    # 특수문자 깨짐 대비 처리
    title_clean = title.replace('\\"', '"').replace('\\\\', '\\')
    print(f"[{idx}] ID: {vid} | 제목: {title_clean}")
