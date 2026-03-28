// 修复 busuanzi 统计在底部显示的问题
// 因为侧边栏和底部使用了相同的 ID，busuanzi 只会更新第一个元素
// 这个脚本会监听侧边栏的变化，然后同步更新底部

document.addEventListener('DOMContentLoaded', () => {
  // 配置：是否启用底部统计显示
  const enableFooterBusuanzi = true;

  if (!enableFooterBusuanzi) return;

  // 侧边栏的元素
  const sidebarUV = document.querySelector('.webinfo-item #busuanzi_value_site_uv');
  const sidebarPV = document.querySelector('.webinfo-item #busuanzi_value_site_pv');
  
  // 底部的元素
  const footerUV = document.querySelector('.footer_busuanzi #busuanzi_value_site_uv');
  const footerPV = document.querySelector('.footer_busuanzi #busuanzi_value_site_pv');

  if (!sidebarUV || !sidebarPV || !footerUV || !footerPV) return;

  // 使用 MutationObserver 监听侧边栏元素的变化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target;
      
      // 如果变化的是 UV 元素
      if (target === sidebarUV) {
        const text = target.innerText;
        // 检查是否还在加载中
        if (!text.includes('fa-spinner') && text.trim()) {
          footerUV.innerText = text;
        }
      }
      
      // 如果变化的是 PV 元素
      if (target === sidebarPV) {
        const text = target.innerText;
        // 检查是否还在加载中
        if (!text.includes('fa-spinner') && text.trim()) {
          footerPV.innerText = text;
        }
      }
    });
  });

  // 开始监听
  observer.observe(sidebarUV, {
    childList: true,
    subtree: true,
    characterData: true
  });
  
  observer.observe(sidebarPV, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // 立即检查一次（防止在监听器启动前数据已经加载完成）
  const checkAndUpdate = () => {
    const uvText = sidebarUV.innerText;
    const pvText = sidebarPV.innerText;
    
    if (!uvText.includes('fa-spinner') && uvText.trim()) {
      footerUV.innerText = uvText;
    }
    
    if (!pvText.includes('fa-spinner') && pvText.trim()) {
      footerPV.innerText = pvText;
    }
  };

  // 立即执行一次
  checkAndUpdate();

  // 设置定时器，定期检查（防止 MutationObserver 失效）
  setInterval(checkAndUpdate, 1000);

  // 也在页面加载完成时检查
  window.addEventListener('load', checkAndUpdate);
});
