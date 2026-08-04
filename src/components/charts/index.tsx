/**
 * Chart Components — Section 3 (bklit.ui replacements)
 * 
 * Real, functioning chart components using Recharts, styled to Genauix tokens.
 * --data (#5EEAD4) teal for chart data, Geist Mono for axes.
 * These are REAL chart components, not screenshots (anti-slop checklist).
 */
'use client';

import {
  LineChart as RechartsLine,
  Line,
  AreaChart as RechartsArea,
  Area,
  RadarChart as RechartsRadar,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// ============================================================
// SHARED CONFIG
// ============================================================

const CHART_COLORS = {
  data: '#5EEAD4',       // --data teal — exclusively for chart data
  dataSecondary: '#FF5A1F', // --signal for secondary series
  grid: 'rgba(255,255,255,0.06)',
  axis: '#8B8D93',       // --ink-muted
  bg: '#131417',         // --surface
  tooltip: '#1B1D21',    // --surface-raised
};

const AXIS_STYLE = {
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  fill: CHART_COLORS.axis,
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: CHART_COLORS.tooltip,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6,
        padding: '8px 12px',
        fontFamily: "'Geist Mono', monospace",
        fontSize: 11,
      }}
    >
      <p style={{ color: CHART_COLORS.axis, margin: '0 0 4px 0' }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, margin: 0 }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ============================================================
// LINE CHART — "grant funding over time"
// ============================================================

interface LineChartProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xKey?: string;
  secondaryKey?: string;
  height?: number;
}

export function GenauixLineChart({
  data,
  dataKey,
  xKey = 'name',
  secondaryKey,
  height = 280,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine
        data={data}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={CHART_COLORS.grid}
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tick={AXIS_STYLE}
          axisLine={{ stroke: CHART_COLORS.grid }}
          tickLine={false}
        />
        <YAxis
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={CHART_COLORS.data}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: CHART_COLORS.data, stroke: CHART_COLORS.bg, strokeWidth: 2 }}
        />
        {secondaryKey && (
          <Line
            type="monotone"
            dataKey={secondaryKey}
            stroke={CHART_COLORS.dataSecondary}
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
            activeDot={{ r: 4, fill: CHART_COLORS.dataSecondary, stroke: CHART_COLORS.bg, strokeWidth: 2 }}
          />
        )}
      </RechartsLine>
    </ResponsiveContainer>
  );
}

// ============================================================
// AREA CHART — "student engagement trend"
// ============================================================

interface AreaChartProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xKey?: string;
  height?: number;
}

export function GenauixAreaChart({
  data,
  dataKey,
  xKey = 'name',
  height = 280,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsArea
        data={data}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.data} stopOpacity={0.3} />
            <stop offset="100%" stopColor={CHART_COLORS.data} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={CHART_COLORS.grid}
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tick={AXIS_STYLE}
          axisLine={{ stroke: CHART_COLORS.grid }}
          tickLine={false}
        />
        <YAxis
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={CHART_COLORS.data}
          strokeWidth={2}
          fill="url(#areaGradient)"
          activeDot={{ r: 4, fill: CHART_COLORS.data, stroke: CHART_COLORS.bg, strokeWidth: 2 }}
        />
      </RechartsArea>
    </ResponsiveContainer>
  );
}

// ============================================================
// RING CHART (Radial / Donut) — "publication-goal completion %"
// ============================================================

interface RingChartProps {
  value: number;
  maxValue?: number;
  label: string;
  size?: number;
}

export function GenauixRingChart({
  value,
  maxValue = 100,
  label,
  size = 160,
}: RingChartProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / maxValue) * circumference;
  const percentage = Math.round((value / maxValue) * 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={CHART_COLORS.grid}
            strokeWidth={4}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={CHART_COLORS.data}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${circumference - progress}`}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>
        {/* Center value */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 24,
            fontWeight: 600,
            color: '#EDEBE4',
          }}
        >
          {percentage}%
        </div>
      </div>
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11,
          color: CHART_COLORS.axis,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ============================================================
// RADAR CHART — "department performance comparison"
// ============================================================

interface RadarChartProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  nameKey?: string;
  height?: number;
}

export function GenauixRadarChart({
  data,
  dataKey,
  nameKey = 'subject',
  height = 280,
}: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadar
        data={data}
        margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
      >
        <PolarGrid stroke={CHART_COLORS.grid} />
        <PolarAngleAxis
          dataKey={nameKey}
          tick={AXIS_STYLE}
        />
        <PolarRadiusAxis
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Performance"
          dataKey={dataKey}
          stroke={CHART_COLORS.data}
          fill={CHART_COLORS.data}
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
