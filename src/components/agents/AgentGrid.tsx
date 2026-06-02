'use client';

import { useState } from 'react';
import { useAgentStore } from '@/stores/agentStore';
import { useUIStore } from '@/stores/uiStore';
import AgentCard from './AgentCard';
import { Plus, Filter, Search, X } from 'lucide-react';
import { AGENT_ROLES, AGENT_STATUSES } from '@/lib/constants';

interface AgentGridProps {
  onSpawnClick?: () => void;
}

export default function AgentGrid({ onSpawnClick }: AgentGridProps) {
  const { agents } = useAgentStore();
  const { searchQuery, setSearchQuery } = useUIStore();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter agents based on search query, role, and status
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.currentTask.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || agent.role === roleFilter;
    
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !['idle', 'completed', 'error'].includes(agent.status)) ||
      agent.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Controls / Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl glass">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs border cursor-pointer outline-none transition-colors"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="idle">Idle</option>
              <option value="thinking">Thinking</option>
              <option value="researching">Researching</option>
              <option value="writing">Writing</option>
              <option value="collaborating">Collaborating</option>
              <option value="reviewing">Reviewing</option>
              <option value="completed">Completed</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs border cursor-pointer outline-none transition-colors"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Roles</option>
              {AGENT_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Active filters display */}
          {(roleFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md transition-colors cursor-pointer hover:bg-red-500/10"
              style={{
                color: 'var(--status-error)',
                border: '1px dashed rgba(239, 68, 68, 0.3)',
              }}
            >
              <X className="w-3 h-3" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Action Button */}
        {onSpawnClick && (
          <button
            onClick={onSpawnClick}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
              color: 'white',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Plus className="w-4 h-4" />
            Spawn Agent
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredAgents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl glass">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--bg-elevated)' }}>
            <Search className="w-8 h-8" style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            No Agents Found
          </h3>
          <p className="text-sm mt-1 max-w-xs" style={{ color: 'var(--text-tertiary)' }}>
            Try adjusting your filters or search query, or spawn a new agent to get started.
          </p>
        </div>
      )}
    </div>
  );
}
