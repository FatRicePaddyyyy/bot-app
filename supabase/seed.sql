SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sending_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: batch_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: batch_job_companies; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: corporate_info; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: crawl_batch_queue; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: crawl_queue; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: generation_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: delivery_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: error_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: generated_content; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: job_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: job_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."job_templates" ("id", "user_id", "name", "description", "recommended", "success_rate", "average_time", "usage_count", "average_response_rate", "is_public", "settings", "created_at", "updated_at", "content", "deleted_at", "category") VALUES
	('4a47c8ca-e808-4c87-9303-d5b3b4093074', NULL, 'スピード重視の新規開拓テンプレート', '短時間で多くの企業にアプローチする際に最適です', true, 92, 30, 0, NULL, false, '{"mode": "ai_auto", "metrics": [], "strategy": "benefit-first", "use_emoji": false, "max_length": 500, "tone_of_voice": "professional", "parallel_tasks": 10, "retry_attempts": 2, "preferred_method": "FORM", "evaluation_period": "30d", "execution_priority": "balanced"}', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.230539+00', '短時間で多くの企業にアプローチする際に最適です', NULL, 'new-client-acquisition'),
	('f790de8c-93bd-4e1e-bd2b-4afb1f5d4ae9', NULL, '丁寧なフォローアップテンプレート', '既存顧客との関係強化に最適な慎重なアプローチ', true, 98, 60, 0, NULL, false, '{"mode": "ai_auto", "metrics": [], "strategy": "benefit-first", "use_emoji": false, "max_length": 500, "tone_of_voice": "professional", "parallel_tasks": 3, "retry_attempts": 5, "preferred_method": "FORM", "evaluation_period": "30d", "execution_priority": "balanced"}', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.230539+00', '既存顧客との関係強化に最適な慎重なアプローチ', NULL, 'new-client-acquisition');


--
-- Data for Name: job_templates_backup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."job_templates_backup" ("id", "user_id", "name", "description", "recommended", "success_rate", "average_time", "usage_count", "average_response_rate", "is_public", "settings", "created_at", "updated_at", "content", "deleted_at", "category") VALUES
	('4a47c8ca-e808-4c87-9303-d5b3b4093074', NULL, 'スピード重視の新規開拓テンプレート', '短時間で多くの企業にアプローチする際に最適です', true, 92, 30, 0, NULL, false, '{"parallel_tasks": 10, "retry_attempts": 2, "preferred_method": "FORM"}', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.1269+00', '短時間で多くの企業にアプローチする際に最適です', NULL, 'new-client-acquisition'),
	('f790de8c-93bd-4e1e-bd2b-4afb1f5d4ae9', NULL, '丁寧なフォローアップテンプレート', '既存顧客との関係強化に最適な慎重なアプローチ', true, 98, 60, 0, NULL, false, '{"parallel_tasks": 3, "retry_attempts": 5, "preferred_method": "DM"}', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.1269+00', '既存顧客との関係強化に最適な慎重なアプローチ', NULL, 'new-client-acquisition');


--
-- Data for Name: llm_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."llm_models" ("id", "model_name", "api_type", "created_at", "updated_at") VALUES
	(1, 'claude-3-opus-20240229', 'anthropic', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(2, 'claude-3-sonnet-20240229', 'anthropic', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(3, 'claude-3-haiku-20240307', 'anthropic', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(4, 'claude-3-5-sonnet-20240620', 'anthropic', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(5, 'gpt-4o-2024-05-13', 'openai', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(6, 'gpt-4o-mini-2024-07-18', 'openai', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(7, 'gemini-1.5-pro', 'google', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00'),
	(8, 'gemini-1.5-flash', 'google', '2025-01-23 00:32:54.046772+00', '2025-01-23 00:32:54.046772+00');


--
-- Data for Name: monitoring_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."monitoring_logs" ("id", "level", "message", "metadata", "created_at") VALUES
	('708ac232-0016-4839-848a-1b5ec5934a3f', 'info', 'No unprocessed batch found', NULL, '2025-01-23 00:35:00.021441+00'),
	('47b0c490-9e9f-49ef-8985-7938ef8c977a', 'info', 'No unprocessed batch found', NULL, '2025-01-23 00:40:00.018274+00'),
	('3feaaf54-050b-4388-8eae-33c5414bb65c', 'info', 'No unprocessed batch found', NULL, '2025-01-23 00:45:00.022954+00'),
	('f857b988-972f-45e1-ae4e-a012cfb5b7e4', 'info', 'No unprocessed batch found', NULL, '2025-01-23 00:50:00.008697+00'),
	('871ff6f4-03e4-4f4d-84c9-e49cc9c13a3d', 'info', 'No unprocessed batch found', NULL, '2025-01-23 00:55:00.014985+00'),
	('574fc0ed-2038-4922-afe3-72ddf3b4c51a', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:00:00.016575+00'),
	('8f8161fe-9991-4d01-b876-9e9ea3c3825d', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:05:00.007346+00'),
	('064939c6-af5a-4846-a48b-4efc38ee62e5', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:10:00.016646+00'),
	('d76c4d43-2677-4ed0-a342-61ba7bcd4f98', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:15:00.017521+00'),
	('a636d111-3466-43be-a37a-5b20af0a2dec', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:20:00.021652+00'),
	('46b3a695-6208-419e-af9f-bf7952926401', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:25:00.021637+00'),
	('73d23fb4-10d2-4a10-97bb-526a8b8e9968', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:30:00.02335+00'),
	('291d4822-9850-467d-85c8-932d98cce759', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:35:00.027162+00'),
	('5e21c049-79ff-4162-a148-8fe66fd45d33', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:40:00.061596+00'),
	('4f7d1497-4a94-4eeb-a9c4-b25d2246379d', 'info', 'No unprocessed batch found', NULL, '2025-01-23 01:45:00.01963+00'),
	('5f3f5705-8146-47a7-839a-af1d44dc4654', 'info', 'No unprocessed batch found', NULL, '2025-01-24 08:45:00.012555+00'),
	('d9ef8d4a-dbac-45c0-99e4-ec88e462a74a', 'info', 'No unprocessed batch found', NULL, '2025-01-24 08:50:00.018345+00'),
	('164115f6-8e0d-4aaf-bc6c-aff11ac8e505', 'info', 'No unprocessed batch found', NULL, '2025-01-24 08:55:00.014367+00'),
	('ca015ed0-2c67-489f-a28c-c0f83de71090', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:00:00.014676+00'),
	('8bd467b0-6f78-4f39-ab08-465cd537cdde', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:05:00.013224+00'),
	('6ea2e875-534d-44bf-90e6-22962b3bbb83', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:10:00.023405+00'),
	('e512153e-1099-454d-ae9f-c62fe001c2a7', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:15:00.014664+00'),
	('750040f3-e813-4e2a-9000-3700d97c2704', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:20:00.011119+00'),
	('4ea724f5-53c6-4836-bcf1-a0c76b04bdf4', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:25:00.021057+00'),
	('f4d2b015-4bc1-4ba8-8e72-3f2a124de4fb', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:30:00.020991+00'),
	('5c73bb4f-af5c-4d64-ba9e-633272d5a8e4', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:35:00.01707+00'),
	('79441f16-8a7e-4bde-9b94-d5f6acb4b393', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:40:00.015208+00'),
	('1e2ebc67-eeb6-49ca-ad09-70c709f69da5', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:45:00.017113+00'),
	('fab85a68-ba9e-4938-97d0-9a0064b0243f', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:50:00.021877+00'),
	('74c7b752-3071-4073-8c20-8d2d6b1277d8', 'info', 'No unprocessed batch found', NULL, '2025-01-24 09:55:00.021718+00'),
	('45e7ced5-b263-4e8c-ab7c-a436350ec5bd', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:00:00.015168+00'),
	('14a8dea5-0359-4c39-a598-4c1a769deaef', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:05:00.009887+00'),
	('662d9727-c37d-47cb-8c2b-9645f9ba658d', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:10:00.016594+00'),
	('7563a3d3-ee92-4624-8279-81ee5f8db8ee', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:15:00.008403+00'),
	('46f2eeea-91f7-4e2f-a186-0a7404fc8670', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:20:00.014637+00'),
	('a971aacd-04fe-44d1-86fd-6e0f14c6e917', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:25:00.017273+00'),
	('81e0ec98-b2cf-48f9-852c-0f3792bff268', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:30:00.021436+00'),
	('6733c811-f060-4420-9afe-f35261c39174', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:35:00.026021+00'),
	('c278bce0-7bff-4ea0-bb5a-74fadf5412da', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:40:00.009193+00'),
	('e4fb8abb-7170-43d6-83a7-0a4bf4f4aaaf', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:45:00.016573+00'),
	('d24f964f-0b45-425f-b0fc-41da228bc299', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:50:00.013912+00'),
	('6611e0bb-d8b8-415f-9fde-9c7feeaff72e', 'info', 'No unprocessed batch found', NULL, '2025-01-24 10:55:00.019381+00'),
	('6063aa40-bdbc-4fc3-af32-a4b216da6fe1', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:00:00.021351+00'),
	('af51e1c6-05f2-472a-961b-63e594d3159d', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:05:00.019517+00'),
	('b9120c99-5115-4247-b256-ba78ec155193', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:10:00.016522+00'),
	('3ad395d7-71d2-48bc-a3d2-27338c11d3d2', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:15:00.01623+00'),
	('9a547ab5-3b08-4e0b-8821-0d4ad9a84257', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:20:00.010675+00'),
	('15a01e98-1dc6-4399-9432-b91f2afa2715', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:25:00.014542+00'),
	('9db5a84b-7dda-41c8-a802-9bff22ac10a2', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:30:00.015564+00'),
	('310deed7-8887-4ff3-833f-eb172bb4544c', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:35:00.017047+00'),
	('d85ca4c4-6a80-4005-a9e1-183ad64a8ee2', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:40:00.01412+00'),
	('c7c2883f-b05f-4eb9-b711-4f2af75c3ced', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:45:00.018069+00'),
	('2b2b0cff-eef6-4cb2-ae84-a7465a7351f6', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:50:00.023865+00'),
	('d5e12a8b-1794-4991-a83d-da306096dc83', 'info', 'No unprocessed batch found', NULL, '2025-01-24 11:55:00.024285+00'),
	('97a076b0-3566-480a-95e7-ee93e6e07426', 'info', 'No unprocessed batch found', NULL, '2025-01-24 12:00:00.016495+00'),
	('f1dae41b-defe-49b1-8fa7-9829f9ed706a', 'info', 'No unprocessed batch found', NULL, '2025-01-24 12:05:00.006393+00'),
	('c60316e3-bd2b-40de-8218-a3cb063fc3c4', 'info', 'No unprocessed batch found', NULL, '2025-01-24 12:20:50.924654+00'),
	('d88bf0da-5c0b-467e-961c-c19202dfa724', 'info', 'No unprocessed batch found', NULL, '2025-01-24 12:55:00.016241+00'),
	('3597b972-9fd1-434a-bee4-f0cc43006f97', 'info', 'No unprocessed batch found', NULL, '2025-01-24 13:00:12.199235+00'),
	('9ff893ed-228d-4a69-a8fe-9e8f69014d09', 'info', 'No unprocessed batch found', NULL, '2025-01-24 13:30:00.014412+00'),
	('2677fed6-b71d-4cce-a73d-df3b2a406afa', 'info', 'No unprocessed batch found', NULL, '2025-01-24 13:45:05.096259+00'),
	('b87358d3-6b1c-4234-9f1f-c704f51ea117', 'info', 'No unprocessed batch found', NULL, '2025-01-24 14:00:56.122197+00'),
	('a9e95c22-0fbc-4b86-ab23-967baa2d2d84', 'info', 'No unprocessed batch found', NULL, '2025-01-24 14:30:08.875126+00'),
	('bd8fcf8e-c8d8-4264-99a9-46503cc65a1f', 'info', 'No unprocessed batch found', NULL, '2025-01-24 15:30:58.332511+00'),
	('a9807dd4-6e91-4e54-98b6-7d2deebd3506', 'info', 'No unprocessed batch found', NULL, '2025-01-24 15:50:00.015783+00'),
	('f1473452-1110-4057-bfc8-adf56238575a', 'info', 'No unprocessed batch found', NULL, '2025-01-24 17:20:00.016691+00'),
	('9f6ec722-5aa0-40bd-80be-55ba775fc070', 'info', 'No unprocessed batch found', NULL, '2025-01-24 17:35:00.013806+00'),
	('d1794e8e-5529-4a3c-8a73-f397e1a1ae17', 'info', 'No unprocessed batch found', NULL, '2025-01-24 17:50:00.017122+00'),
	('7e1996a6-5e6b-43a3-ac68-37aa37c65452', 'info', 'No unprocessed batch found', NULL, '2025-01-24 18:05:06.865447+00'),
	('bb402762-d263-4042-9a00-a5be78830d9b', 'info', 'No unprocessed batch found', NULL, '2025-01-24 18:50:00.005854+00'),
	('ffafd135-1a25-4b65-ab7b-5755d3f928f6', 'info', 'No unprocessed batch found', NULL, '2025-01-24 19:05:54.011955+00'),
	('ed084f0c-a294-4fb4-a7c0-25cd382690fb', 'info', 'No unprocessed batch found', NULL, '2025-01-24 19:35:00.013487+00'),
	('6ecde436-92a1-49a1-87ad-0c167aaccab3', 'info', 'No unprocessed batch found', NULL, '2025-01-24 20:00:10.277427+00'),
	('3bb191c8-e2f1-4406-8f69-382472a9fe67', 'info', 'No unprocessed batch found', NULL, '2025-01-24 20:36:14.223132+00'),
	('b3f75431-1c91-48fc-bf42-be3e6ee67787', 'info', 'No unprocessed batch found', NULL, '2025-01-24 21:25:00.014385+00'),
	('2c36853b-5b4a-4f22-9e4c-936c68ac4a8a', 'info', 'No unprocessed batch found', NULL, '2025-01-24 22:25:00.022549+00'),
	('54ef011c-4391-4b10-aaee-46382eb812a6', 'info', 'No unprocessed batch found', NULL, '2025-01-24 22:55:00.012224+00'),
	('feb23577-3200-4330-b9c9-f6940d1b130e', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:10:05.51046+00'),
	('c6be19f6-7c00-4ec0-9346-d5ee86b48fdb', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:25:46.814988+00'),
	('5c756c9f-9383-4836-9238-b1c240421e87', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:30:00.020354+00'),
	('6d63f7df-4bb0-4f2f-86a6-09503cb1ba40', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:35:00.019674+00'),
	('0dbf1e7a-d56d-4f9f-9201-394e7b924d13', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:40:00.009936+00'),
	('ec43af2c-3eb7-49c7-9595-5341abe79eef', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:45:00.025361+00'),
	('2d33837a-74a7-4f46-9692-361123f648a0', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:50:00.020581+00'),
	('8d459df5-57b0-4bf8-947a-c12cd37889a3', 'info', 'No unprocessed batch found', NULL, '2025-01-24 23:55:00.01835+00'),
	('49b8f5e3-c9cc-4f80-89ff-1b481fc772f3', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:00:00.02337+00'),
	('e87f1df7-2e46-42a3-a729-2a55144a54a2', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:05:00.022659+00'),
	('29d86ea1-d425-43ed-accb-e51a9e01e9c4', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:10:00.017973+00'),
	('28b03b67-3230-48ce-8765-06571d13e520', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:15:00.021804+00'),
	('85bc7fd1-027c-4032-a59c-7e32e3de5bd8', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:20:00.018986+00'),
	('a41a68eb-75ad-47cb-bd23-7384f5e0c5e1', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:25:00.028791+00'),
	('b04fda5c-333c-4e05-8847-a36316f9cd80', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:30:00.019856+00'),
	('1bbc16a3-2647-4b42-9337-1e042393845c', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:35:00.018661+00'),
	('689700ab-3cbe-4ebf-9d91-c63f5914bd02', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:40:00.015946+00'),
	('4118268c-be9d-4faa-ba27-a6e11f322c64', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:45:00.023854+00'),
	('b6f84d79-09f4-423e-84f8-ef6e234a9711', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:50:00.024131+00'),
	('f967994d-559c-4d97-b8e0-8b51fd0a7cc9', 'info', 'No unprocessed batch found', NULL, '2025-01-25 00:55:00.024175+00'),
	('f9ea7168-1ea0-4fb8-b782-88c18e94671e', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:00:00.041758+00'),
	('1daaf189-b8aa-49a7-9596-d6ccffad91c3', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:05:00.014627+00'),
	('dd2041ce-3350-4c75-8499-1308ffa53743', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:10:00.028743+00'),
	('0eed0167-2193-477c-9c5e-50a2cde7c65d', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:15:00.019559+00'),
	('6cc5c260-d445-4309-8bc4-aae597e78c57', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:20:00.016141+00'),
	('fdac9f60-aa0c-4c1c-8dd6-6388d7619ea7', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:25:00.017638+00'),
	('339a0024-5fc6-4b26-a3dd-c541dab76040', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:30:00.022819+00'),
	('d78e0227-9a3c-4f2f-b1ef-7c9203601929', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:35:00.022372+00'),
	('dea726db-276a-4677-9527-68c59b257b4d', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:40:00.015528+00'),
	('582f522d-811b-4ebe-bb06-b37d5695f2d9', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:45:00.027214+00'),
	('e413d378-c505-4773-8cf9-c1d617220fd5', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:50:00.013598+00'),
	('69cac6bb-9807-4f5c-bdae-b9e28347e5e0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 01:55:00.027373+00'),
	('573ccb4e-445b-47cf-b294-ba62f75bfb5c', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:00:00.011594+00'),
	('06699901-fb85-4e5d-9963-ccc971c11d26', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:05:00.018424+00'),
	('9b49190f-89f4-431a-8bd4-ce7a67419688', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:10:00.033388+00'),
	('383f31c5-9450-4044-a780-191f62c95482', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:15:00.022623+00'),
	('5b33518b-36c2-4cb5-b339-ead02cf69517', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:20:00.035667+00'),
	('a09da6e3-e115-4ba1-8e86-d6932d2dbbc7', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:25:00.022152+00'),
	('a24557af-3b85-4007-938e-f1bb70e73c36', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:30:00.021558+00'),
	('123b71f7-06d8-4aac-a237-1857c26a7687', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:35:00.032742+00'),
	('4d5adaf4-4bb9-40c8-9710-4442df9ea891', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:40:00.008656+00'),
	('c7c90c4c-195e-4f5f-a091-2eaf2e53ac5a', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:45:00.013114+00'),
	('ab46e631-5836-4241-b23c-7481469fb7a1', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:50:00.023947+00'),
	('2b34d957-4480-44a7-ba4c-41a583d315dd', 'info', 'No unprocessed batch found', NULL, '2025-01-25 02:55:00.012382+00'),
	('fdce0b30-12e5-4003-8d92-dd5d2b145f19', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:00:00.012818+00'),
	('1a99fcd5-b0b0-461f-87fc-e36f5f377d90', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:05:00.033351+00'),
	('46a88c68-0b76-44c1-940f-9e6427036307', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:10:00.033504+00'),
	('fab69478-a49d-4b81-834b-4c71c483d9a6', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:15:00.023951+00'),
	('04a5b76f-5199-4b94-908f-56987ef9e687', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:20:00.029314+00'),
	('8a22fe9a-4596-4d06-ba3b-0c87120757f4', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:25:00.029993+00'),
	('34d3b223-a91b-46d4-94fd-2b3130e28602', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:30:00.025399+00'),
	('c6b267e8-e539-4593-b40b-5a16b93724ae', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:35:00.024011+00'),
	('0da761d0-8c5c-4f3b-8314-3f6ad9fa4ace', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:40:00.021491+00'),
	('b0939fcd-907d-4dd2-a36a-3cca1346822d', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:45:00.026959+00'),
	('64a743f5-1038-4b7a-bbaa-5d33afc09da3', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:50:00.023742+00'),
	('4e221414-82c5-4593-84ff-dc22c1f39761', 'info', 'No unprocessed batch found', NULL, '2025-01-25 03:55:00.021141+00'),
	('10cc0be2-baae-4373-8caa-7dc3a1d61e90', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:00:00.027483+00'),
	('3e9e35ac-207b-42e2-a146-068191077042', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:05:00.017773+00'),
	('8ac15a4c-7e50-4c88-808e-693c9f85c264', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:10:00.020911+00'),
	('692a6fb3-bf78-4fd4-ab06-e323ffce6e59', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:15:00.059912+00'),
	('d2833aa3-8442-4055-b65d-dccac714fb70', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:20:00.021288+00'),
	('70352133-a728-44d1-8be0-4a64e1b20835', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:25:00.024848+00'),
	('c7188a62-356e-4043-93ed-005b0a4a7c1c', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:30:00.044441+00'),
	('fbcbf59d-0a9e-44fc-a946-9587c6068cb2', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:35:00.017441+00'),
	('d057e1e0-e404-4599-b4c8-2ba82309872b', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:40:00.015825+00'),
	('a5d38990-4f8a-4fef-8027-8c869a0e9e5e', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:45:00.024713+00'),
	('a4fb0148-771b-4868-adba-44e6f333e302', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:50:00.017176+00'),
	('eb23b213-42f9-4814-9fa5-0866055391d0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 04:55:00.021+00'),
	('65817ad8-823d-44de-9c37-88b44d594992', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:00:00.029169+00'),
	('d044bedc-9c1e-467b-be75-c9a6e3b031d1', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:05:00.024398+00'),
	('f5f75528-e5b8-4761-9f0a-c06ddf8a9130', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:10:00.025361+00'),
	('d9a0f0c7-1f08-4973-a19b-67e627e56899', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:15:00.02718+00'),
	('a6488f41-ee14-405b-b3e2-f961c07623f7', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:20:00.029396+00'),
	('99e272cb-b356-4acd-bfa2-42d04c8ede90', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:25:00.028544+00'),
	('268908db-d2d7-4540-ac0e-a72eea7ae6ae', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:30:00.01871+00'),
	('96c56f47-1f90-4ca0-bd4d-30e72d666d16', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:35:00.018788+00'),
	('bedfffbf-cb2f-4e47-a461-de8200bb8772', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:40:00.021778+00'),
	('4b81e4d3-b9cb-437f-8a0a-3262ad2783e4', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:45:00.006048+00'),
	('205a5ecf-e837-4dc7-88c0-0bcc40d2f948', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:50:00.01876+00'),
	('6f8f6124-427d-4db0-970f-151d8f766345', 'info', 'No unprocessed batch found', NULL, '2025-01-25 05:55:00.0276+00'),
	('34c79e71-577e-4f70-9e43-5fa7ec0d4594', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:00:00.029707+00'),
	('accd13ca-1ed9-42b6-b279-b159a936b8bb', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:05:00.016086+00'),
	('06852dcf-9986-4198-92b1-e00204f43fcd', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:10:00.014642+00'),
	('f08954de-2ec5-40bd-9c2d-6d9c0fd71f07', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:15:00.026065+00'),
	('05266e65-71b0-4e2b-b6e6-533661636a87', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:20:00.025505+00'),
	('fac4ab3c-48ed-4445-a3c1-7a2955f53688', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:25:00.02823+00'),
	('37487c73-69b0-45c2-80ed-504b5cb1b4f0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:30:00.025899+00'),
	('26bc3ec9-a4a8-43cd-88c2-d0dd49763686', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:35:00.018033+00'),
	('96c8806b-ebde-4198-bb89-fbbe6b3bd966', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:40:00.019253+00'),
	('271ce2f3-1150-4df4-8f02-7ff0dcc62ad2', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:45:00.028409+00'),
	('83e5f2a0-1c61-4d63-a953-ad1b4ad62da4', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:50:00.030919+00'),
	('49fb9021-93e2-4091-b5f9-6b39b4d9bf4d', 'info', 'No unprocessed batch found', NULL, '2025-01-25 06:55:00.013624+00'),
	('d58e7d98-b195-4463-aad0-821f9dce0b4e', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:00:00.017737+00'),
	('98fcbef3-283c-4d5a-ad88-969291b4cede', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:05:00.016986+00'),
	('bcad32c2-c894-40ba-8765-048a3d463f23', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:10:00.019718+00'),
	('df575a80-3023-4d35-8b84-e38d3681d20b', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:15:00.023964+00'),
	('5f0db9d4-5a28-4ffb-8a27-3f43cb2344f5', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:20:00.028611+00'),
	('f5ed70dc-1083-467b-9798-896feed7a207', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:25:00.018099+00'),
	('c324592c-a1ff-4d25-8058-f143f339a224', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:30:00.021395+00'),
	('ffddb5af-7ddd-4535-b6cc-d2a66e6984d0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:35:00.008445+00'),
	('e4203674-23ef-4827-95a7-f9e33ecbfcdf', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:40:00.025575+00'),
	('fe4028ca-06db-4f7d-890c-5b387da6b3c6', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:45:00.016486+00'),
	('d218dfa9-72fc-4d06-ade3-9e707b95f9b2', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:50:00.089653+00'),
	('9a9043be-6d92-40ef-8c22-cb792158e560', 'info', 'No unprocessed batch found', NULL, '2025-01-25 07:55:00.013514+00'),
	('1ae74718-29f6-4b62-833a-7e9710972676', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:00:00.017663+00'),
	('9f178442-b610-44af-af5e-b2a7c2747b67', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:05:00.023073+00'),
	('93abad04-1ca3-4ec3-839e-08a88bc9b6d8', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:10:00.02684+00'),
	('7c8f3d0e-b225-4c68-a62a-28bae0bb1300', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:15:00.029658+00'),
	('05b7db1a-6480-43ee-8746-a5b117148070', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:20:00.036832+00'),
	('49362769-c989-4877-9006-08f493ed28dc', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:25:00.029881+00'),
	('b57aa6c5-1043-49a4-b09e-e44b37f69a8f', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:30:00.014435+00'),
	('0fea6411-10d0-4f57-81c9-c862a4b6bc48', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:35:00.029247+00'),
	('632c3cde-eda9-47bb-85d7-4e82c280656a', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:40:00.016308+00'),
	('c118060f-f9fc-4cbd-bd5c-4420cfb19ce0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:45:00.016275+00'),
	('3372c594-088a-44ec-806c-e8a7c2310041', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:50:00.017819+00'),
	('5a1fdc84-fdca-4e80-a2f0-0057b82c2592', 'info', 'No unprocessed batch found', NULL, '2025-01-25 08:55:00.008052+00'),
	('7b9d1211-663d-4596-97c7-ebc03894eb21', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:00:00.013635+00'),
	('a7cf2409-acb8-49bc-b8ab-a652e60ce325', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:05:00.015768+00'),
	('c9be3649-20de-422c-b432-4ee7157d7fb0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:10:00.027252+00'),
	('45484ba9-c750-459e-af32-bd43ab5b6782', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:15:00.017985+00'),
	('f0d35591-4890-4156-940e-35cc0e47134d', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:20:00.02411+00'),
	('eb3ac754-f034-4d71-9891-dad7a67dbaac', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:25:00.022736+00'),
	('c3cdd153-40a8-4e15-b854-76c63ab00d86', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:30:00.01931+00'),
	('644f982f-361c-45df-96a1-674fbf6b1fe0', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:35:00.014079+00'),
	('fd83b50e-b2a3-44fa-b04b-4bd588d61fd6', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:40:00.014651+00'),
	('081c91c7-1f45-421c-b260-23dcc3403870', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:45:00.017117+00'),
	('ebcb341d-61c7-4c4c-a1dd-47250988ac11', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:50:00.003384+00'),
	('b18fe7eb-9c60-4aa6-90a7-7cbd24937e2b', 'info', 'No unprocessed batch found', NULL, '2025-01-25 09:55:00.017542+00'),
	('7ef23d31-2892-4e27-804a-9fc0005f6376', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:00:00.017389+00'),
	('9d6bc573-093d-4620-bc9e-2ebfb0a3bc12', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:05:00.021721+00'),
	('fe15ceea-707c-482d-bd5f-561e12ac0943', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:10:00.02221+00'),
	('ec04a433-fd42-432e-ae2e-e6e67fb0a389', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:15:00.017979+00'),
	('f1fab85f-54f1-4dca-8b4a-27a546cb2317', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:20:00.020892+00'),
	('13f952d3-fb8f-4f82-b063-da8a9be087eb', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:25:00.017089+00'),
	('298d3ed1-7328-4328-b823-1c2df5faad16', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:30:00.017556+00'),
	('0b811718-6c3a-41bd-99b8-81c7c1223e03', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:35:00.023483+00'),
	('4307b5c8-a434-40a8-aba2-cb9d278d4345', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:40:00.021953+00'),
	('06756077-6390-4dbd-88de-d40ecfdb9b3f', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:45:00.024595+00'),
	('144dab44-f4d9-4735-ab95-92b68831c935', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:50:00.018792+00'),
	('b1f82eec-f955-4bb4-aa4a-bfa9aa50e21b', 'info', 'No unprocessed batch found', NULL, '2025-01-25 10:55:00.021259+00'),
	('7fa31fd9-2afc-4c6e-a394-f327ec1d4f63', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:00:00.014516+00'),
	('1cc35941-3270-4630-8074-0a6cdb875193', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:05:00.006639+00'),
	('7d818411-4162-43eb-a3dc-1e3df92eec28', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:10:00.022561+00'),
	('9a7b1f94-b52e-42dd-9e7d-808894600856', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:15:00.015079+00'),
	('1c33d866-a5a5-4f2a-9ab4-2253c914467a', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:20:00.01575+00'),
	('f2dfc1c1-4401-461b-b477-76316d76eced', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:25:00.024197+00'),
	('cf7934a8-95c3-477c-a7e6-4cfc5eedbffb', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:30:00.021779+00'),
	('66e185e2-d104-4d15-8a01-713558065e43', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:35:00.023156+00'),
	('252123ef-21d0-4162-af01-26a5f544b928', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:40:00.01868+00'),
	('a1e2eb11-c09b-48b2-ac38-f53b7f963440', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:45:00.015503+00'),
	('5b7fda03-8672-4aa5-b89d-ecf73187afc9', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:50:00.01842+00'),
	('7c88471e-1cf2-418b-8115-2d64ba1591cf', 'info', 'No unprocessed batch found', NULL, '2025-01-25 11:55:00.018937+00'),
	('fe0eddb5-2135-4079-a5fc-266cd4ef4789', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:00:00.018046+00'),
	('01c44d60-ffee-4b2f-8cc0-de524b912143', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:05:00.019745+00'),
	('97db3dd4-d2ee-4f01-979b-a6d1ee1b421c', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:10:00.020256+00'),
	('27f110a1-04d6-40b4-9a05-7e8d760e249c', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:15:00.016123+00'),
	('3870f972-bf77-4b21-8904-cb3c851e84c5', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:20:00.009846+00'),
	('bb3021db-b3f0-4a4d-9669-2e01c67f8870', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:25:00.018043+00'),
	('88697c18-0f44-46d5-a1a7-78f5ee3dee12', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:30:00.010474+00'),
	('3a0ef572-cb6d-4755-b790-ca030dd89e00', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:35:00.022527+00'),
	('fd7fe5ad-d91e-4cf7-8f25-2c31d487aab2', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:40:00.019968+00'),
	('39b38b63-5841-4144-b2cc-4b87dfee2f28', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:45:00.013751+00'),
	('ebcb57b5-bd80-41db-b5b9-9e7ac0c4099a', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:50:00.012137+00'),
	('02d02a2c-c470-4052-942c-83a734e2e48d', 'info', 'No unprocessed batch found', NULL, '2025-01-25 12:55:00.008929+00'),
	('1465474f-19c8-43d9-bba4-d8b92825346f', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:00:00.020035+00'),
	('28b257a0-01b6-4736-9ff9-0646e17c5e42', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:05:00.018662+00'),
	('792ff019-b92a-45e8-8198-ed2dbc2ee6f6', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:10:00.019148+00'),
	('59fa0386-0d88-4d5a-be12-2204dfab592f', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:15:00.028711+00'),
	('ad54cf96-0809-4673-913c-3734a5ad6bb4', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:20:00.016856+00'),
	('dc08da6a-6f0f-46ab-9752-efcdde5a5dfd', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:25:00.012555+00'),
	('5883a481-2118-4a69-9506-b6840c556bc5', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:30:00.012366+00'),
	('a674a640-8862-4dfa-bc93-d5f8dfac06e3', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:35:00.021094+00'),
	('56148268-7ff7-4a19-8ec8-d7e7ffed669f', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:40:00.017493+00'),
	('c3697550-8d86-4a0f-b8ed-85e13d90bfb5', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:45:00.015613+00'),
	('37cdd3ea-d661-4691-bbdc-3b13a8bd5603', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:50:00.061319+00'),
	('f7cb0b6f-de40-4768-99b5-343af6105815', 'info', 'No unprocessed batch found', NULL, '2025-01-25 13:55:00.021733+00'),
	('ea2f0fea-19cf-484a-b807-56f9a49ac0fc', 'info', 'No unprocessed batch found', NULL, '2025-01-25 14:00:00.031393+00'),
	('a75924c3-82e8-4d23-993d-0fffeb4e7c47', 'info', 'No unprocessed batch found', NULL, '2025-01-25 14:05:00.027623+00'),
	('fe5c54d9-17a7-455f-bfa2-db1854f0d683', 'info', 'No unprocessed batch found', NULL, '2025-01-25 14:10:00.027983+00'),
	('23145cce-9b4d-45e1-ab69-918725cfddf7', 'info', 'No unprocessed batch found', NULL, '2025-01-25 14:15:00.008408+00');


--
-- Data for Name: product_files; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: search_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sending_group_companies; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tags" ("id", "name", "color", "description", "created_at", "updated_at") VALUES
	('4bc4cc84-963e-4c8d-9ace-4f5a0f9b023e', '高速', '#3B82F6', '処理速度を重視したテンプレート', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.097451+00'),
	('ba18b968-a5b5-4c59-816f-8380e5c20a50', '大量送信', '#10B981', '大規模な送信に適したテンプレート', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.097451+00'),
	('1dd5581e-c574-452b-b99d-3fe7e8e0247f', '高応答率', '#F59E0B', '高い応答率を実現したテンプレート', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.097451+00'),
	('2086e850-77d9-4d60-a0b8-35028f7ffe8e', '関係構築', '#8B5CF6', '顧客との関係構築を重視したテンプレート', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.097451+00'),
	('a689db50-8fb9-4cd7-9289-b05e5c3f9a61', '丁寧', '#EC4899', '丁寧なアプローチを行うテンプレート', '2025-01-23 00:32:54.097451+00', '2025-01-23 00:32:54.097451+00');


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: template_attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: template_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('product-pdfs', 'product-pdfs', NULL, '2025-01-23 00:32:54.116534+00', '2025-01-23 00:32:54.116534+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: llm_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."llm_models_id_seq"', 8, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
