-- Seed all 19 Cisco certification tracks

INSERT INTO tracks (id, name, level, exam_code, exam_cost_usd, exam_duration_minutes) VALUES
  ('ccna-core', 'CCNA Core', 'ccna', '200-301', 330, 120),
  ('ccna-cybersecurity', 'CCNA Cybersecurity', 'ccna', '200-201', 330, 120),
  ('ccna-automation', 'CCNA Automation', 'ccna', '200-901', 330, 120),
  ('ccnp-enterprise', 'CCNP Enterprise', 'ccnp', '350-401 ENCOR', 400, 120),
  ('ccnp-security', 'CCNP Security', 'ccnp', '350-701 SCOR', 400, 120),
  ('ccnp-datacenter', 'CCNP Data Center', 'ccnp', '350-601 DCCOR', 400, 120),
  ('ccnp-serviceprovider', 'CCNP Service Provider', 'ccnp', '350-501 SPCOR', 400, 120),
  ('ccnp-collaboration', 'CCNP Collaboration', 'ccnp', '350-801 CLCOR', 400, 120),
  ('ccnp-wireless', 'CCNP Wireless', 'ccnp', '300-430 ENWLSI', 400, 120),
  ('ccnp-automation', 'CCNP Automation', 'ccnp', 'ENAUTO', 400, 120),
  ('ccnp-cybersecurity', 'CCNP Cybersecurity', 'ccnp', 'CBRCOR', 400, 120),
  ('ccie-enterprise', 'CCIE Enterprise Infrastructure', 'ccie', 'ENCOR + Lab', 1600, 480),
  ('ccie-wireless', 'CCIE Enterprise Wireless', 'ccie', 'ENCOR + Lab', 1600, 480),
  ('ccie-security', 'CCIE Security', 'ccie', 'SCOR + Lab', 1600, 480),
  ('ccie-datacenter', 'CCIE Data Center', 'ccie', 'DCCOR + Lab', 1600, 480),
  ('ccie-serviceprovider', 'CCIE Service Provider', 'ccie', 'SPCOR + Lab', 1600, 480),
  ('ccie-collaboration', 'CCIE Collaboration', 'ccie', 'CLCOR + Lab', 1600, 480),
  ('ccie-automation', 'CCIE Automation', 'ccie', 'ENAUTO + Lab', 1600, 480),
  ('ccde', 'CCDE Architect', 'ccde', 'Written + Practical', 1600, 360)
ON CONFLICT (id) DO NOTHING;
