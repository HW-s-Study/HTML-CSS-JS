import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // Next16에 추가. 컴포넌트를 자동으로 메모이제이션
  reactStrictMode: false, // 잠재적인 오류 찾도록 두 번 렌더링 하는 옵션
};

export default nextConfig;