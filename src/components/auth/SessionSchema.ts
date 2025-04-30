import * as v from "valibot";
import type { LiveSession } from "./Session";

export const LiveSessionSchema = v.object({
	status: v.literal("alive"),
	user: v.object({
		id: v.string(),
		name: v.string(),
		email: v.pipe(v.string(), v.email()),
		image: v.nullable(v.string())
	}),
	created: v.pipe(v.string(), v.isoTimestamp()),
	expires: v.pipe(v.string(), v.isoTimestamp()),
	token: v.string()
});

export const validateSession = (maybeSession: unknown) => {
	return v.parse(LiveSessionSchema, maybeSession) as LiveSession;
};
