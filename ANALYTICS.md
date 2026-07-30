# Customer journey analytics

The public catalog sends privacy-safe journey events to the existing Google Analytics 4 property. Admin routes are excluded.

## Events

| Event | Meaning | Useful parameters |
| --- | --- | --- |
| `page_view` | A public route was viewed, including client-side navigation | `page_path`, `page_type`, `page_title` |
| `page_engagement` | At least 10 seconds were spent on a page | `engagement_seconds`, `max_scroll_percent` |
| `scroll_depth` | Visitor reached 25%, 50%, 75%, or 90% | `percent_scrolled`, `page_path` |
| `catalog_search` | Search or filters were used | `search_term`, `category_filter`, `brand_filter`, `result_count` |
| `filter_change` | A category or brand filter changed | `filter_type`, `filter_value` |
| `select_product` | A product card was opened | `product_name`, `product_code`, `category` |
| `view_product` | A product detail page was viewed | `product_name`, `product_code`, `category` |
| `add_to_quote` | A product was added to the quote | `product_name`, `product_code` |
| `contact_enquiry` | Contact enquiry was initiated | `enquiry_type` |
| `whatsapp_click` / `quote_whatsapp` | A WhatsApp lead action occurred | `location`, `item_count` |
| `phone_click` | A phone lead action occurred | `location` |
| `share_product` | A product was shared | `method`, `product_code` |

Every event also includes `journey_session_id`, first landing page, initial referrer hostname, and available UTM source/medium/campaign. The journey ID is random, anonymous, stored per browser tab, and renews after 30 minutes of inactivity. Form values, names, email addresses, phone numbers, and admin activity are not sent.

## GA4 setup for analysis

In **Admin → Data display → Custom definitions**, create event-scoped custom dimensions for:

- `journey_session_id`
- `page_type`
- `product_code`
- `category`
- `category_filter`
- `brand_filter`
- `result_count`
- `landing_page`
- `initial_referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`

Create custom metrics for `engagement_seconds`, `percent_scrolled`, and `result_count`.

In **Explore → Funnel exploration**, use:

1. `page_view`
2. `catalog_search` or `select_product`
3. `view_product`
4. `add_to_quote`
5. `contact_enquiry`, `quote_whatsapp`, `whatsapp_click`, or `phone_click`

For raw event-level analysis, link the GA4 property to BigQuery. GA4 custom definitions only begin reporting after they are registered and do not backfill historical events.
