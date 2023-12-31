"use client"
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {load} from 'cheerio';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FacebookEmbed, InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';

export default function Post({ platform, link, isSupport } : { platform : string, link : string, isSupport : boolean }) {

	async function getOpenGraphImageFromLink(url: string): Promise<string | undefined> {
		try {
			// Fetch the HTML content of the URL
			const response = await fetch(url);
			const html = await response.text();

			// Load the HTML content into Cheerio
			const $ = load(html);

			// Find the Open Graph image tag and extract the image URL
			const ogImage = $('meta[property="og:image"]').attr('content');
			console.log(ogImage);
			// Return the Open Graph image URL
			return ogImage;
		} catch (error) {
			console.error('Error fetching or parsing Open Graph data:', error);
			throw error;
		}
	}

	const getBackground = () => {
		switch (platform) {
			case 'facebook':
				return 'facebook.jpg';
			case 'instagram':
				return 'instagram.png';
			case 'tiktok':
				return 'tiktok.webp';
			case 'twitter':
				return 'x.jpg';
			case 'spotify':
				return 'spotify.png';
			case 'youtube':
				return 'youtube.png';
			default:
				return "";
		}
	};

	useEffect(() => {
		// getOpenGraphImageFromLink(link);
	}, []);

	return (
		<a dir="rtl" href={link} target='_blank'>
			<Card className='w-72 h-60 lg:h-60 lg:w-56 flex flex-col items-center relative overflow-hidden bg-primary' >
				<div className='py-4 px-4 h-full w-full bg-cover bg-center'  style={ { backgroundImage: `url("assets/${getBackground()}")` }}>
					{/* {
						platform == "tiktok" &&
						<TikTokEmbed url={link} placeholderDisabled={true} />
					} */}
					{/* {
						platform == "facebook" &&
						<FacebookEmbed url={link} />
					}
					{
						platform == "instagram" &&
						<InstagramEmbed url={link} />
					} */}
					{/* <h3 className='text-lg font-medium'>{link}</h3> */}
				</div>
				{
					isSupport ? 
					<div className=' w-full h-16 bottom-0 flex items-center justify-center'>
						<p dir='ltr' className='text-white font-bold text-base'>SUPPORT THIS POST</p>
					</div> :
					<div className='bg-destructive w-full h-16 bottom-0 flex items-center justify-center'>
						<p dir='ltr' className='text-white font-bold text-base'>REPORT THIS POST</p>
					</div>
				}
			</Card>
		</a>
	);
};