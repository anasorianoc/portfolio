/** Phosphor Icons — https://phosphoricons.com (regular weight via styles.css) */

function phIcon(name, className = '') {
  const extra = className ? ` ${className}` : '';
  return `<i class="ph ph-${name}${extra}" aria-hidden="true"></i>`;
}

if (typeof window !== 'undefined') {
  window.phIcon = phIcon;
}
