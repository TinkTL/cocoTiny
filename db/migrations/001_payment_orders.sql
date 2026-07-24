CREATE TABLE IF NOT EXISTS payment_orders (
  order_no VARCHAR(90) PRIMARY KEY,
  asset_slug VARCHAR(100) NOT NULL,
  asset_title VARCHAR(200) NOT NULL,
  object_key VARCHAR(220) NOT NULL,
  email VARCHAR(254) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  status VARCHAR(12) NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'PAID', 'CLOSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  paid_at TIMESTAMPTZ,
  alipay_trade_no VARCHAR(80) UNIQUE,
  download_token_hash CHAR(64) UNIQUE,
  download_expires_at TIMESTAMPTZ,
  download_count INTEGER NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  download_limit INTEGER NOT NULL DEFAULT 3 CHECK (download_limit > 0),
  email_status VARCHAR(12) NOT NULL DEFAULT 'NOT_READY'
    CHECK (email_status IN ('NOT_READY', 'PENDING', 'SENT', 'FAILED')),
  email_attempt INTEGER NOT NULL DEFAULT 0 CHECK (email_attempt >= 0),
  email_last_attempt_at TIMESTAMPTZ,
  email_sent_at TIMESTAMPTZ,
  resend_email_id VARCHAR(100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payment_orders_email_lookup_idx
  ON payment_orders (order_no, email);

CREATE INDEX IF NOT EXISTS payment_orders_status_idx
  ON payment_orders (status, created_at DESC);
