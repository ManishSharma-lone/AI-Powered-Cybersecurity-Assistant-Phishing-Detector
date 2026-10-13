"""SQLite History Persistence Module.

Stores user-approved analysis metadata without retaining sensitive full message bodies,
honoring privacy requirements (FR-12 and Section 10.7).
"""

import sqlite3
import os
from typing import List, Dict, Any, Optional
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "phishing_history.db")


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initializes the SQLite schema if it does not already exist."""
    with get_db_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS scan_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                snippet TEXT NOT NULL,
                risk_level TEXT NOT NULL,
                risk_score INTEGER NOT NULL,
                indicator_count INTEGER NOT NULL,
                url_count INTEGER NOT NULL
            )
        """)
        conn.commit()

# Ensure table exists on import
init_db()



def save_history_record(
    snippet: str,
    risk_level: str,
    risk_score: int,
    indicator_count: int,
    url_count: int
) -> int:
    """Saves a privacy-preserving summary of a scan and returns the record ID."""
    clean_snippet = snippet[:80].strip() + ("..." if len(snippet) > 80 else "")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO scan_history (timestamp, snippet, risk_level, risk_score, indicator_count, url_count)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (timestamp, clean_snippet, risk_level, risk_score, indicator_count, url_count))
        conn.commit()
        return cursor.lastrowid or 0


def get_history_records(limit: int = 30) -> List[Dict[str, Any]]:
    """Retrieves recent scan records ordered by timestamp descending."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, timestamp, snippet, risk_level, risk_score, indicator_count, url_count
            FROM scan_history
            ORDER BY id DESC
            LIMIT ?
        """, (limit,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]


def delete_history_record(record_id: int) -> bool:
    """Deletes a specific history record by ID."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM scan_history WHERE id = ?", (record_id,))
        conn.commit()
        return cursor.rowcount > 0


def clear_all_history() -> int:
    """Deletes all scan history records."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM scan_history")
        conn.commit()
        return cursor.rowcount
