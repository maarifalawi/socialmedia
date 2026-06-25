import re, os

FILES = [
    'src/pages/KompetitorAnalysis.tsx',
    'src/pages/CaptionGenerator.tsx',
    'src/pages/Kampanye.tsx',
    'src/pages/Performa.tsx',
    'src/pages/Audiens.tsx',
    'src/pages/BantuanAdmin.tsx',
    'src/pages/Laporan.tsx',
    'src/pages/Perbandingan.tsx',
    'src/pages/Platform.tsx',
    'src/pages/RingkasanInsight.tsx',
    'src/pages/TargetKPI.tsx',
    'src/pages/WaktuTerbaik.tsx',
    'src/pages/ProjectNew.tsx',
    'src/pages/Dashboard.tsx',
    'src/pages/Bantuan.tsx',
]

fixed = 0
for fpath in FILES:
    if not os.path.exists(fpath):
        print(f'SKIP: {fpath}')
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    content = ''.join(lines)

    # Cek apakah navigate dipakai di luar deklarasi
    # Cari semua penggunaan 'navigate(' tapi bukan deklarasi
    navigate_usage = re.findall(r'navigate\s*\(', content)
    navigate_declared = bool(re.search(r'const\s+navigate\s*=\s*useNavigate', content))

    # Cek apakah useNavigate di-import
    has_nav_import = bool(re.search(r'^\s*import\s+\{[^}]*useNavigate[^}]*\}\s+from\s+"react-router-dom"', content, re.MULTILINE))

    # Cek apakah useEffect masih dipakai (untuk fetch data)
    has_useeffect_usage = bool(re.search(r'useEffect\s*\(', content))
    has_useeffect_import = bool(re.search(r'^\s*import\s+\{[^}]*useEffect[^}]*\}\s+from\s+"react"', content, re.MULTILINE))

    # Cek authLoading dipakai
    authloading_usage = bool(re.search(r'authLoading', content))
    has_uselayout = bool(re.search(r'authLoading\s*\?', content))
    has_uselayout2 = bool(re.search(r'if\s*\(\s*authLoading', content))

    changed = False

    # Hapus navigate kalau declare tapi nggak pernah dipakai
    if navigate_declared and len(navigate_usage) == 0:
        # Hapus baris const navigate = useNavigate();
        content = re.sub(
            r'\n\s*const\s+navigate\s*=\s*useNavigate\(\);\n',
            '\n',
            content
        )
        changed = True

    # Hapus useNavigate dari import kalau navigate sudah dihapus atau nggak dipakai
    if has_nav_import and (not navigate_usage or navigate_declared and len(navigate_usage) == 0):
        # Hapus useNavigate dari import statement
        content = re.sub(
            r'^\s*import\s+\{([^}]*?)useNavigate,?\s*([^}]*?)\}\s+from\s+"react-router-dom"',
            lambda m: f'import {{{m.group(1)}{m.group(2)}}from "react-router-dom"',
            content,
            flags=re.MULTILINE
        )
        # Bersihkan koma berlebih
        content = re.sub(
            r'import\s+\{\s*,',
            'import {',
            content
        )
        content = re.sub(
            r',\s*\}from "react-router-dom"',
            '} from "react-router-dom"',
            content
        )
        changed = True

    # Hapus useEffect dari import kalau nggak dipakai
    if has_useeffect_import and not has_useeffect_usage:
        content = re.sub(
            r'^\s*import\s+\{([^}]*?)useEffect,?\s*([^}]*?)\}\s+from\s+"react"',
            lambda m: f'import {{{m.group(1)}{m.group(2)}}from "react"',
            content,
            flags=re.MULTILINE
        )
        content = re.sub(
            r'import\s+\{\s*,',
            'import {',
            content
        )
        content = re.sub(
            r',\s*\}from "react"',
            '} from "react"',
            content
        )
        changed = True

    if changed:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed += 1
        print(f'FIXED: {fpath}')

print(f'\nTotal files fixed: {fixed}')
