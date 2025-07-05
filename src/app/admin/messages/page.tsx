"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AdminMessagesPage() {
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [filter, setFilter] = useState({ date: '' });
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [readStatus, setReadStatus] = useState<{ [id: string]: boolean }>({});
  const [starred, setStarred] = useState<{ [id: string]: boolean }>({});
  const [tab, setTab] = useState<'all' | 'starred'>('all');

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
    if (tab === 'starred') {
      filtered = filtered.filter(msg => starred[msg._id]);
    }
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
  }, [messages, filter, sortOrder, tab, starred]);

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

  // Analytics calculation
  const analytics = useMemo(() => {
    const now = new Date();
    let monthCount = 0, yearCount = 0;
    const subjectCount: Record<string, number> = {};
    messages.forEach(msg => {
      if (!msg.createdAt) return;
      const msgDate = new Date(msg.createdAt);
      if (msgDate.getFullYear() === now.getFullYear()) {
        yearCount++;
        if (msgDate.getMonth() === now.getMonth()) monthCount++;
      }
      if (msg.subject) subjectCount[msg.subject] = (subjectCount[msg.subject] || 0) + 1;
    });
    const mostCommonSubject = Object.entries(subjectCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
    return { monthCount, yearCount, mostCommonSubject };
  }, [messages]);

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
              {/* Analytics */}
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div>Messages this month: <b>{analytics.monthCount}</b></div>
                <div>Messages this year: <b>{analytics.yearCount}</b></div>
                <div>Most common subject: <b>{analytics.mostCommonSubject}</b></div>
                <Button size="sm" variant="outline" onClick={() => {
                  const csv = [
                    ['Name', 'Email', 'Subject', 'Message', 'Date'],
                    ...filteredMessages.map(m => [m.name, m.email, m.subject, m.message, m.createdAt ? new Date(m.createdAt).toLocaleString() : ''])
                  ].map(row => row.map(x => '"' + String(x).replace(/"/g, '""') + '"').join(',')).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'messages.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}>Export CSV</Button>
              </div>
              <Tabs value={tab} onValueChange={setTab} className="mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Messages</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                </TabsList>
              </Tabs>
              {filteredMessages.length === 0 && <div>No messages found.</div>}
              {filteredMessages.map((msg, idx) => (
                <div key={msg._id || idx} className="border rounded p-4 mb-2 bg-muted relative cursor-pointer group" onClick={e => {
                  // Only open modal if not clicking star or read
                  if ((e.target as HTMLElement).closest('.star-btn, .read-btn')) return;
                  setSelectedMessage(msg);
                }}>
                  <div><b>Name:</b> {msg.name}</div>
                  <div><b>Email:</b> {msg.email}</div>
                  <div><b>Subject:</b> {msg.subject}</div>
                  <div className="truncate"><b>Message:</b> {msg.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="button"
                      className={`star-btn text-xl transition-colors ${starred[msg._id] ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 focus:outline-none`}
                      aria-label="Star message"
                      onClick={e => { e.stopPropagation(); setStarred(s => ({ ...s, [msg._id]: !s[msg._id] })); }}
                    >
                      ★
                    </button>
                    <button
                      type="button"
                      className={`read-btn text-xs px-2 py-1 rounded ${readStatus[msg._id] ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'} focus:outline-none`}
                      aria-label="Mark as read"
                      onClick={e => { e.stopPropagation(); setReadStatus(s => ({ ...s, [msg._id]: !s[msg._id] })); }}
                    >
                      {readStatus[msg._id] ? 'Read' : 'Unread'}
                    </button>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={e => { e.stopPropagation(); deleteMessage(msg._id); }}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              ))}
              {/* Message Details Modal */}
              <Dialog open={!!selectedMessage} onOpenChange={open => !open && setSelectedMessage(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message Details</DialogTitle>
                    <DialogDescription>{selectedMessage?.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : ''}</DialogDescription>
                  </DialogHeader>
                  <div className="mb-2"><b>Name:</b> {selectedMessage?.name}</div>
                  <div className="mb-2"><b>Email:</b> {selectedMessage?.email}</div>
                  <div className="mb-2"><b>Subject:</b> {selectedMessage?.subject}</div>
                  <div className="mb-2"><b>Message:</b><br /><Textarea value={selectedMessage?.message} readOnly className="mt-1" /></div>
                  <div className="flex gap-2 mt-4">
                    <Button asChild variant="secondary" size="sm">
                      <a href={`mailto:${selectedMessage?.email}?subject=Re: ${encodeURIComponent(selectedMessage?.subject || '')}`}>Reply</a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)}>Close</Button>
                  </div>
                </DialogContent>
              </Dialog>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
