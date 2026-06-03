import { create } from "zustand";
import { MOCK_STUDY_SESSIONS } from "@/lib/mock/mockSessions";
import { MOCK_USER } from "@/lib/mock/mockUser";
import type { StudySession } from "@/types";

interface StudySessionsState {
  sessions: StudySession[];
  addSession: (
    data: Omit<StudySession, "id" | "userId" | "createdAt"> & {
      createdAt?: string;
      sessionDate?: string;
    }
  ) => Promise<StudySession>;
  deleteSession: (id: string) => StudySession | undefined;
  restoreSession: (session: StudySession) => void;
}

export const useStudySessionsStore = create<StudySessionsState>((set, get) => ({
  sessions: [...MOCK_STUDY_SESSIONS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ),
  addSession: async (data) => {
    await new Promise((r) => setTimeout(r, 200));
    const createdAt = data.createdAt ?? new Date().toISOString();
    const sessionDate =
      data.sessionDate ?? (data.createdAt ? data.createdAt.slice(0, 10) : createdAt.slice(0, 10));
    const session: StudySession = {
      id: `session-${Date.now()}`,
      userId: MOCK_USER.id,
      trackId: data.trackId,
      topicId: data.topicId ?? null,
      durationMinutes: data.durationMinutes,
      notes: data.notes ?? null,
      sessionDate,
      createdAt,
    };
    set((state) => ({
      sessions: [session, ...state.sessions],
    }));
    return session;
  },
  deleteSession: (id) => {
    const removed = get().sessions.find((s) => s.id === id);
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
    }));
    return removed;
  },
  restoreSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })),
}));
