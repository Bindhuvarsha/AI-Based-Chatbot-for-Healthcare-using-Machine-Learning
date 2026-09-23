import React from 'react';

export const StatCard = ({
  title,
  value,
  unit = '',
  status,
  statusType = 'normal', // normal, warning, danger, success
  icon,
  subtitle,
  trend,
  color = '#3b82f6',
  onClick
}) => {
  const getBadgeStyle = () => {
    switch (statusType) {
      case 'danger':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'success':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4.5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-blue-200' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-1.5 mb-1">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
        {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
      </div>

      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50 text-xs">
        {status && (
          <span className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${getBadgeStyle()}`}>
            {status}
          </span>
        )}
        {subtitle && <span className="text-slate-400 text-[11px] truncate max-w-[130px]">{subtitle}</span>}
        {trend && (
          <span
            className={`font-semibold text-[11px] ${
              trend.startsWith('+') ? 'text-emerald-600' : trend.startsWith('-') ? 'text-rose-600' : 'text-slate-500'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
export default StatCard;
