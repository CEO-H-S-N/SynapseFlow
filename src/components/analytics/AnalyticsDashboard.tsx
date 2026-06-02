'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, Zap, Clock, DollarSign, AlertTriangle, CheckCircle2, Bot } from 'lucide-react';

const taskData = [
  { name: 'Mon', completed: 45, failed: 3 },
  { name: 'Tue', completed: 52, failed: 2 },
  { name: 'Wed', completed: 61, failed: 5 },
  { name: 'Thu', completed: 48, failed: 1 },
  { name: 'Fri', completed: 73, failed: 4 },
  { name: 'Sat', completed: 38, failed: 2 },
  { name: 'Sun', completed: 29, failed: 1 },
];

const tokenData = [
  { name: '00:00', tokens: 12000 },
  { name: '04:00', tokens: 8500 },
  { name: '08:00', tokens: 32000 },
  { name: '12:00', tokens: 45000 },
  { name: '16:00', tokens: 38000 },
  { name: '20:00', tokens: 28000 },
  { name: '23:59', tokens: 15000 },
];

const stats = [
  { label: 'Tasks Completed', value: '346', change: '+12%', icon: CheckCircle2, color: '#22c55e' },
  { label: 'Active Agents', value: '8', change: '+2', icon: Bot, color: '#8b5cf6' },
  { label: 'Tokens Used', value: '1.2M', change: '+8%', icon: Zap, color: '#06b6d4' },
  { label: 'Avg Response', value: '2.4s', change: '-15%', icon: Clock, color: '#3b82f6' },
  { label: 'Total Cost', value: '$14.28', change: '+5%', icon: DollarSign, color: '#f59e0b' },
  { label: 'Error Rate', value: '2.1%', change: '-0.5%', icon: AlertTriangle, color: '#ef4444' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg text-xs"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        <p style={{ color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: stat.change.startsWith('+') && stat.label !== 'Error Rate' && stat.label !== 'Total Cost' ? '#22c55e' : stat.change.startsWith('-') && (stat.label === 'Error Rate' || stat.label === 'Avg Response') ? '#22c55e' : '#f59e0b' }}
                >
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Task completion chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-5"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                Tasks Completed
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                Last 7 days
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <TrendingUp className="w-3 h-3" style={{ color: '#22c55e' }} />
              <span className="text-xs font-medium" style={{ color: '#22c55e' }}>+18%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Token usage chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-5"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                Token Usage
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                Today
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
              <Zap className="w-3 h-3" style={{ color: '#06b6d4' }} />
              <span className="text-xs font-medium" style={{ color: '#06b6d4' }}>178.5K today</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={tokenData}>
              <defs>
                <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tokens" stroke="#06b6d4" fill="url(#tokenGradient)" strokeWidth={2} name="Tokens" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
