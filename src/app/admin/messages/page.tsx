"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminMessagesPage() {
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [filter, setFilter] = useState({ date: '' });
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/contact?token=${encodeURIComponent(token)}`);
      if (!res.ok) throw new Error('Unauthorized or error fetching messages');
      const data = await res.json();
      setMessages(data.messages || []);
      setShowMessages(true);
    } catch (err: any) {
      setError(err.message || 'Error fetching messages');
      setShowMessages(false);
    } finally {
      setLoading(false);
    }
  };

  // Filtered and sorted messages
  const filteredMessages = useMemo(() => {
    let filtered = messages;
    if (filter.date) {
      const now = new Date();
      filtered = filtered.filter(msg => {
        if (!msg.createdAt) return false;
        const msgDate = new Date(msg.createdAt);
        switch (filter.date) {
          case 'today':
            return msgDate.toDateString() === now.toDateString();
          case 'week': {
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return msgDate >= startOfWeek && msgDate <= endOfWeek;
          }
          case 'month':
            return msgDate.getFullYear() === now.getFullYear() && msgDate.getMonth() === now.getMonth();
          case 'year':
            return msgDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [messages, filter, sortOrder]);

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/contact?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setMessages(msgs => msgs.filter(m => m._id !== id));
    } catch (err: any) {
      setError(err.message || 'Error deleting message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Admin Message Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {!showMessages && (
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={token}
                onChange={e => setToken(e.target.value)}
              />
              <Button onClick={fetchMessages} disabled={loading || !token}>
                {loading ? 'Loading...' : 'View Messages'}
              </Button>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>
          )}
          {showMessages && (
            <div className="space-y-6 mt-6">
              <Button variant="outline" onClick={() => setShowMessages(false)}>
                Log Out
              </Button>
              <h2 className="text-lg font-semibold mt-4 mb-2">Messages</h2>
              {/* Filter UI */}
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="ml-0"
                  onClick={() => setSortOrder(o => (o === 'desc' ? 'asc' : 'desc'))}
                >
                  Sort by Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                </Button>
                <select
                  className="border rounded px-2 py-1 text-sm bg-secondary text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filter.date}
                  onChange={e => setFilter({ date: e.target.value })}
                >
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              {filteredMessages.length === 0 && <div>No messages found.</div>}
              {filteredMessages.map((msg, idx) => (
                <div key={msg._id || idx} className="border rounded p-4 mb-2 bg-muted relative">
                  <div><b>Name:</b> {msg.name}</div>
                  <div><b>Email:</b> {msg.email}</div>
                  <div><b>Subject:</b> {msg.subject}</div>
                  <div><b>Message:</b> {msg.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => deleteMessage(msg._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              ))}
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
