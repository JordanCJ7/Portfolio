"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminMessagesPage() {
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

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
              {messages.length === 0 && <div>No messages found.</div>}
              {messages.map((msg, idx) => (
                <div key={msg._id || idx} className="border rounded p-4 mb-2 bg-muted">
                  <div><b>Name:</b> {msg.name}</div>
                  <div><b>Email:</b> {msg.email}</div>
                  <div><b>Subject:</b> {msg.subject}</div>
                  <div><b>Message:</b> {msg.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
